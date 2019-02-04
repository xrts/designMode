// 1、原型模式
{
// clone 自己,生成一个新对象
// java 默认有 clone 接口, 不用自己实现

// 'Object.creat' 用到了原型模式的思想 (虽然不是 java 中的 clone)
// 基于一个原型创建一个对象
    let prototype = {
        getName: function () {
            return this.first + ' ' + this.last
        },
        say: function () {
            console.log('hello')
        }
    };

    // 基于原型创建 X
    let x = Object.create(prototype);
    x.first = 'A';
    x.last = 'B';
    console.log(x.getName());
    x.say();

    // 基于原型创建 y
    let y = Object.create(prototype);
    y.first = 'C';
    y.last = 'D';
    console.log(y.getName());
    y.say();

// 对比 JS 中的原型 prototype
    // prototype 可以理解为 ES6 class 的一种底层原理
    // 而 class 是实现面向对象的基础, 并不是服务于某个模式
    // 若干年后 ES6 全面普及, 大家可能会忽略掉 prototype
    // 但是 Object.create 却会长久存在
}


// 2、桥接模式
{
    // 用于把抽象化与实现化解耦
    // 使得二者可以独立变化
}


// 3、组合模式
{
    // 生成树形结构, 表示 "整体-部分" 关系
    // 让整体和部分都具有一致的操作方式
    // 例如 文件夹-文件-文件夹

    // 场景
    // 虚拟 DOM 中的 vnode 是这种形式, 但数据类型简单
    // 整体和单个节点的操作是一致的
    // 整体和单个节点的数据结构也保持一致
}


// 4、享元模式
{
    // 共享内存( 主要考虑内存,而非效率)
    // 相同的数据,共享使用

    // 场景
    // 事件代理
}


// 5、策略模式
{
    // 不同策略分开处理
    // 避免出现大量 if...else 或者 switch...case
}


// 6、模板方式模式
{
    // 对自己内部顺序处理的方法都封装在一个方法里,对外抛出一个方法
}

// 7、职责链模式
{
    // 一步操作可能分为多个职责角色来完成
    // 把这些角色都分开,然后用一个链串起来
    // 将发起者和各个处理者进行隔离

    // 场景
    // JS 中的链式操作

    // 演示
    // 请假审批,需要组长审批,经理审批,最后总监审批
    class Action {
        constructor(name) {
            this.name = name;
            this.nextAction = null
        }
        setNextAction(action) {
            this.nextAction = action
        }
        handle() {
            console.log(`${this.name} 审批`);
            if (this.nextAction !== null) {
                this.nextAction.handle()
            }
        }
    }

    // test
    let a1 = new Action('组长');
    let a2 = new Action('经理');
    let a3 = new Action('总监');
    a1.setNextAction(a2);
    a2.setNextAction(a3);
    a1.handle()
}


// 8、命令模式
{
    // 执行命令时,发布者和执行者分开
    // 中间加入命令对象,作为中转站

    // 演示
    // 接受者
    class Receiver {
        exec() {
            console.log('执行')
        }
    }
    // 命令者
    class Command {
        constructor(receiver) {
            this.receiver = receiver
        }
        cmd() {
            console.log('触发命令');
            this.receiver.exec()
        }
    }
    // 触发者
    class Invoker {
        constructor(command) {
            this.command = command
        }
        invoke() {
            console.log('开始');
            this.command.cmd()
        }
    }

    // test
    // 士兵
    let soldier = new Receiver();
    // 小号手
    let trumpeter = new Command(soldier);
    // 将军
    let general = new Invoker(trumpeter);
    general.invoke()

    // JS中的应用
    // 网页富文本编辑器操作,浏览器封装了一个命令对象
}



// 9、备忘录模式
{
    // 随时记录一个对象的状态变化
    // 随时可以恢复之前的某个状态(如撤销功能)

    // 状态备忘
    class Memento {
        constructor(content) {
            this.content = content
        }
        getContent() {
            return this.content
        }
    }

    // 备忘列表
    class CareTaker {
        constructor() {
            this.list = []
        }
        add(memento) {
            this.list.push(memento)
        }
        get(index) {
            return this.list[index]
        }
    }

    // 编辑器
    class Editor {
        constructor() {
            this.content = null
        }
        setContent(content) {
            this.content = content
        }
        getContent() {
            return this.content
        }
        saveContentToMemento() {
            return new Memento(this.content)
        }
        getContentFromMemento(memento) {
            this.content = memento.getContent()
        }
    }

    // test
    let editor = new Editor();
    let careTaker = new CareTaker();
    editor.setContent('111');
    editor.setContent('222');
    careTaker.add(editor.saveContentToMemento()); // 存储备忘录
    editor.setContent('333');
    careTaker.add(editor.saveContentToMemento());
    editor.setContent('444');


    console.log(editor.getContent());
    editor.getContentFromMemento(careTaker.get(1)); // 撤销
    console.log(editor.getContent());
    editor.getContentFromMemento(careTaker.get(0)); // 撤销
    console.log(editor.getContent());

}


// 10、中介者模式
{
    class Mediator {
        constructor(a, b) {
            this.a = a;
            this.b = b
        }
        setA() {
            let number = this.b.number;
            this.a.setNumber(number * 100)
        }
        setB() {
            let number = this.a.number;
            this.b.setNumber(number / 100)
        }
    }

    class A {
        constructor() {
            this.number = 0
        }
        setNumber(num,m) {
            this.number = num;
            if (m) {
                m.setB();
            }
        }
    }
    class B {
        constructor() {
            this.number = 0
        }
        setNumber(num,m) {
            this.number = num;
            if (m) {
                m.setA();
            }
        }
    }

    // test
    let a = new A();
    let b = new B();
    let m = new Mediator(a, b);
    a.setNumber(100, m);
    console.log(a.number, b.number);
    b.setNumber(100, m);
    console.log(a.number, b.number);
}


// 11、访问者模式
// 将数据操作和数据结构进行分离

// 12、解释器模式
// 描述语言语法如何定义,如何解释和编译(babel)

