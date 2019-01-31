// 面向对象三要素
// 继承: 子类继承父类
// 封装: 数据的权限和保密
// 多态: 同一接口不同实现

// 类,即模板
// 父类
class People {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    eat() {
        alert(`${this.name} eat something`)
    }
    speak() {
        alert(`My name is ${this.name}, age ${this.age}`)
    }
}


// 创建实例
let wang = new People('wang', 21);
wang.eat();
wang.speak();

// 子类
// extends继承关键字
class Student extends People {
    constructor(name, age, number) {
        // super关键字 把name和age传递给父类去处理
        super(name, age);
        this.number = number
    }
    study() {
        alert(`${this.name} study`)
    }
}

// 实例
let xiaoming = new Student('xiaoming', 10, 'A1');
xiaoming.study();
console.log(xiaoming.number);
xiaoming.eat();

//  继承
// 继承可将公共方法抽离出来,提高复用,减少冗余

// 封装
// 减少耦合,不该外露的不外露
// 利于数据,接口的权限管理
// *public 完全开放  *protected 对子类开放  *private 对自己开放
// typescript
// 父类
class People {
    name;
    age;
    protected weight; // 定义protected 属性,受保护的属性,只有子类能访问
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.weight = 120
    }
    eat() {
        alert(`${this.name} eat something`)
    }
    speak() {
        alert(`My name is ${this.name}, age ${this.age}`)
    }
}

// 子类
class Student extends People {
    number;
    private girlfriend; // 定义 private 属性
    constructor(name, age, number) {
        super(name, age);
        this.number = number;
        this.girlfriend = 'xiaoli'
    }
    study() {
        alert(`${this.name} study`)
    }
    getWeight() {
        alert(`$(this.weight`)
    }
}

// 实例
let xiaoming = new Student('xiaoming', 10, 'A1');
xiaoming.getWeight();
// console.log(xiaoming.girlfriend) //报错


// 多态
// 同一个接口,不同表现(需要结合java等语言的接口,重写,重载等功能)
// 保持子类的开放性和灵活性
// 面向接口编程
class People {
    constructor(name) {
        this.name = name
    }
    say() {

    }
}

class A extends People {
    constructor(name) {
        super(name)
    }
    say() {
        alert('I am A')
    }
}
class B extends People {
    constructor(name) {
        super(name)
    }
    say() {
        alert('I am B')
    }
}

let a = new A('a');
a.say();
let b = new B('b');
b.say();

// jquery如何使用面向对象?

class jQuery {
    constructor(selector) {
        let slice = Array.prototype.slice;
        let dom = slice.call(document.querySelectorAll(selector)); // 复制一份数组
        let len = dom ? dom.length : 0;
        for (let i; i < len; i++) {
            this[i] = dom[i]
        }
        this.lenght = len;
        this.selector = selector || ''
    }
    append(node){
        // ...
    }
    addClass(name) {
        // ...
    }
    html(data) {
        // ...
    }
    // 此处省略 N 个API
}
window.$ = function (selector) {
    // 工厂模式
    return new jQuery(selector)
};


// 为何使用面向对象?

