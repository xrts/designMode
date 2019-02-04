// 观察者模式
// 发布 & 订阅
// 一对多

// 主题,保存状态,状态变化之后触发所有观察者对象
class Subject {
    constructor() {
        this.state = 0;
        this.observers = []
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state;
        this.notifyAllObservers()
    }
    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
    attach(observer) {
        this.observers.push(observer)
    }
}

// 观察者
class Observer {
    constructor(name, subject) {
        this.name = name;
        this.subject= subject;
        this.subject.attach(this)
    }
    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}

// test
let s = new Subject();
let o1 = new Observer('o1',s);
let o2 = new Observer('o2',s);
let o3 = new Observer('o3',s);

s.setState(1);
s.setState(2);
s.setState(3);

// 场景
// 网页事件绑定 ( 绑定的click事件: 先订阅,当点击的时候发布 )
// Promise (.then().then())
// jQuery callbacks ( $.Callbacks() )
// nodejs 自定义事件

// jQuery callbacks 自定义事件,自定义回调
let callbacks = $.Callbacks(); // 注意大小写
callbacks.add(function(info) {
    console.log('fn1',info)
});
callbacks.add(function(info) {
    console.log('fn2',info)
});
callbacks.add(function(info) {
    console.log('fn3',info)
});
callbacks.fire('gogogo');
callbacks.fire('fire');


// nodejs 自定义事件
const EventEmitter = require('events').EventEmitter;

const emitter1 = new EventEmitter();
emitter1.on('some',info => {
    // 监听 some 事件
    console.log('some event is occured 1',info)
});
emitter1.on('some', info => {
    // 监听 some 事件
    console.log('some event is occured 2',info)
});
// 触发 some 事件
emitter1.emit('some','xxxx');

// 任何构造函数都可以继承 EventEmitter 的方法 on emit
class Dog extends EventEmitter {
    constructor(name) {
        super();
        this.name = name
    }
}
let simon = new Dog('simon');
simon.on('bark', function() {
    console.log(this.name, 'barked')
});
setInterval(() => {
    simon.emit('bark')
}, 500);

// Stream 用到了自定义事件
let fs = require('fs');
let readStream = fs.createReadStream('./data/file1.txt'); // 读取文件的 Stream

let length = 0;
readStream.on('data', function(chunk) {
    length += chunk.toString().length
});
readStream.on('end', function() {
    console.log(length)
});


// 其他场景
// nodejs中: 处理http请求,多进程通讯
// vue和React 组件生命周期触发
// vue watch

// http请求
function serverCallback(req, res) {
    let method = req.method.toLowerCase(); // 获取请求方法
    if (method === 'get') {
        // ....
    }
    if(method === 'post') {
        // 接收 post 请求的内容
        let data = '';
        req.on('data', function(chunk) {
            // 一点一点接收内容
            data += chunk.toString()
        });
        req.on('end', function() {
            // 接收完毕,将内容输出
            res.writeHead(200, {'Content-typr': 'text/html'});
            res.write(data);
            res.end()
        })
    }
}