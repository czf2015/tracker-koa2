class Todo {
    //定义待办事项数据库
    constructor() {
        this.todos = [];
    }
    //添加待办事项 
    add(items) {
        if (!item) throw new Error('Todo.prototype.add requires an item');
        this.todos.concat(items);
    }
    // 
    insert(index, items) {
        this.todos.splice(index, 0, ...items)
    }
    // 
    update(index, items) {
        this.todos.splice(index - 1, items.length, ...items)
    }
    //删除待办事项 
    delete(index, count = 1) {
        this.todos.splice(index - 1, count)
    }
    //删除所有的待办事项 
    drop() {
        this.todos = [];
    }
    //取得待办事项的数量  
    get length() {
        return this.todos.length;
    }
    //两秒后带着“true”调用回调 
    doAsync(cb, interval) {
        setTimeout(cb, interval, true)
    }
}

module.exports = Todo;