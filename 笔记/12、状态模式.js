// 状态模式
// 一个对象有状态变化
// 每次状态变化都会触发一个逻辑
// 不能总是用 if...else 来控制

// 状态 (红灯、绿灯、黄灯）
class State {
    constructor(color) {
        this.color = color
    }
    handle(context) {
        console.log(`turn to ${this.color} light`);
        // 设置状态
        context.setState(this)
    }
}

// 主体
class Context {
    constructor() {
        this.state = null
    }
    // 获取状态
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
    }
}

// test
let context = new Context();

let green = new State('green');
let yellow = new State('yellow');
let red = new State('red');

// 绿灯亮了
green.handle(context);
console.log(context.getState()); // 打印状态
// 黄灯亮了
yellow.handle(context);
console.log(context.getState()); // 打印状态
// 红灯亮了
red.handle(context);
console.log(context.getState()); // 打印状态


// 使用场景
// 有限状态机
// 写一个简单的Promise

// 有限状态机
// 有限个状态、在这些状态之间的变化(如交通信号灯)
// 使用开源lib: javascript-state-machine

// 状态机模型
let fsm = new StateMachine({
    init:'收藏', // 初始状态,待收藏
    transition: [
        {
            name: 'doStore',
            from: '收藏',
            to: '取消收藏'
        },
        {
            name: 'deleteStore',
            from: '取消收藏',
            to: '收藏'
        }
    ],
    methods: {
        // 执行收藏
        onDoStore: function () {
            alert('收藏成功');
            updateText()
        },
        // 取消收藏
        onDeleteStore: function() {
            alert('已取消收藏');
            updateText()
        }
    }
});

let $btn = $('#btn');

// 点击事件
$btn.click(function() {
    if (fsm.is('收藏')) {
        fsm.doStore()
    } else {
        fsm.deleteStore()
    }
});
// 更新文案
function updateText() {
    $btn.text(fsm.state)
}
// 初始化文案
updateText();