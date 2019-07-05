function parseField(field) {
    return field
        .split(/\[|\]/)
        .filter((s) => s);
}


function getField(ctx, field) {   //基于parseField()的结果查找属性
    let val = ctx.body;

    field.forEach((prop) => {
        val = val[prop];
    });

    return val;
}


exports.required = (field) => {
    field = parseField(field);   //解析输入域一次

    return (ctx, next) => {
        if (getField(ctx, field)) {   //每次收到请求都检查输入域是否有值
            next();   //如果有，则进入下一个中间件
        } else {
            ctx.error(`${field.join(' ')} is required`);   //如果没有，显示错误
            ctx.redirect('back');
        }
    };
};


exports.lengthAbove = (field, len) => {
    field = parseField(field);

    return (ctx, next) => {
        if (getField(ctx, field).length > len) {
            next();
        } else {
            const fields = field.join(' ');
            ctx.error(`${fields} must have more than ${len} characters`);
            ctx.redirect('back');
        }
    }
}