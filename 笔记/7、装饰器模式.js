// 装饰器模式
// 为对象添加新功能
// 不改变原有的结构和功能

class Circle {
    draw() {
        console.log('画一个圆形');
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }
    draw() {
        this.circle.draw();
        this.setRedBorder(circle);
    }
    setRedBorder() {
        console.log('设置红色边框');
    }
}

// 测试代码
let circle = new Circle();
circle.draw();

let dec = new Decorator(circle);
dec.draw();

// 使用场景
// es7 装饰器
@testDec
class Demo {

}
function testDec(target) {
    target.isDec = true
}
alert(Demo.isDec);

// 加参数的装饰器
function testDec(isDec) {
    return function (target) {
        target.isDec = isDec
    }
}

@testDec(false)
class Demo {

}
alert(Demo.isDec);

// 装饰类- mixin 示例
function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ... list)
    }
}

const Foo = {
    foo() { alert('foo')}
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo();  // 'foo'

// 装饰方法一
// 只可读
class person {
    constructor() {
        this.first = 'A';
        this.last = 'B'
    }
    // 装饰方法
    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}

function readonly(target, name, descriptor) {
    //descriptor 属性描述对象 (Object.defineProperty 中会用到), 原来的值如下
    // {
    //     value: specifiedFunction,
    //     enumerable: false,
    //     configurable: true,
    //     writable: true
    //
    // }
    descriptor.writable = false;
    return descriptor
}

let p = new Person();
console.log(p.name);
// p.name = function () {} //这里会报错,因为name是只读属性


// 装饰方法二
// 打印日志
class Math {
    // 装饰方法
    @log
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function() {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    };
    return descriptor;
}

const math = new Math();
const result = math.add(2, 4); // 执行 add 时,会自动打印日志, 因为有 @log 装饰器
console.log('result',result);