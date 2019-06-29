const db = require('koa-redis').createClient()
const bcrypt = require('bcrypt')

class User {
    constructor(obj) {
        for (const key in obj) {
            this[key] = obj[key]
        }
    }

    hashPassword(cb) {
        bcrypt.genSalt(12, (err, salt) => {   //生成有12个字符的盐   
            if (err) return cb(err);

            this.salt = salt;   //设定盐以便保存

            bcrypt.hash(this.pass, salt, (err, hash) => {   //生成哈希  
                if (err) return cb(err);

                this.pass = hash;   //设定哈希以便保存 

                cb();
            });
        });
    }

    save(cb) {
        if (this.id) {   //如果设置了ID，则用户已经存在 
            this.update(cb);
        } else {
            db.incr('user:ids', (err, id) => {   //创建唯一ID 
                if (err) return cb(err);

                this.id = id;   //设定ID，以便保存

                this.hashPassword((err) => {   //密码哈希
                    if (err) return cb(err);

                    this.update(cb);   //保存用户属性
                });
            });
        }
    }

    update(cb) {
        const id = this.id;

        db.set(`user:id:${this.name}`, id, (err) => {   //用名称索引用户ID
            if (err) return cb(err);

            db.hmset(`user:${id}`, this, (err) => {   //用Redis存储当前类的属性
                cb(err);
            });
        });
    }

    static getByName(name, cb) {
        User.getId(name, (err, id) => {   //根据名称查找用户ID
            if (err) return cb(err);

            User.get(id, cb);   //用ID抓取用户
        });
    }

    static getId(name, cb) {
        db.get(`user:id:${name}`, cb);   //取得由名称索引的ID
    }

    static get(id, cb) {
        db.hgetall(`user:${id}`, (err, user) => {   //获取普通对象哈希
            if (err) return cb(err);

            cb(null, new User(user));   //将普通对象转换成新的User对象
        });
    }

    static authenticate(name, pass, cb) {
        User.getByName(name, (err, user) => {   //通过用户名查找用户     
            if (err) return cb(err);

            if (!user.id) return cb();   //用户不存在

            bcrypt.hash(pass, user.salt, (err, hash) => {   //对给出的密码做哈希处理     
                if (err) return cb(err);

                if (hash == user.pass) return cb(null, user);   //匹配发现项  
                cb();   //密码无效  
            });
        });
    }
}

module.exports = User