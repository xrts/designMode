// 写一个简单的 Promise, 只关注 promise 的状态变化
// promise 是一个类
// 初始化时要传一个函数,有两个参数,resolve, reject, 成功resolve, a失败reject
// 返回的promise有.then()的方法,方法内有两个参数都是函数,成功了执行第一个函数,失败执行第二个

// Promise 就是有限状态机
// Promise 三种状态: pending fullfilled rejected
// pending -> fullfilled 或者 pending -> rejected
// 不能逆向变化

// 定义 Promise
class MyPromise {
    constructor(fn) {
        this.successList = [];
        this.failList = [];

        fn(() => {
            // resolve 函数
            fsm.resolve(this)
        },() => {
            // reject 函数
            fsm.reject(this)
        })
    }
    then(successFn, failFn) {
        this.successList.push(successFn);
        this.failList.push(failFn)
    }
}

// 模型
let fsm = new StateMachine({
    init:'pending',
    transition: [
        {
            name: 'resolve',
            from: 'pending',
            to: 'fullfilled'
        },
        {
            name: 'reject',
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        // 成功
        onResolve: function(state, data) {
            // 参数: state - 当前状态实例; data - fsm.resolve(xxx) 执行时传递过来的参数
            data.successList.forEach(fn => fn())
        },
        // 失败
        onReject: function(state, data) {
            // 参数: state - 当前状态实例; data - fsm.reject(xxx) 执行时传递过来的参数
            data.failList.forEach(fn => fn())
        }
    }
});

// 测试代码
function loadImg(src) {
    const promise = new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.onload = function () {
            resolve(img)
        };
        img.onerror = function () {
            reject('图片加载失败')
        };
        img.src = src
    });
    return promise;
}

let src = 'http://img.zgsta.com/119-2-1-2-535/8a7f59620161ef43eb26c0d69bde629c_nofinger.jpg?imageView2/1/w/380/h/278/q/100 ';
let result = loadImg(src);

result.then(function() {
    console.log('ok1')
}, function(){
    console.log('fail1');
});
result.then(function() {
    console.log('ok2')
}, function(){
    console.log('fail2');
});