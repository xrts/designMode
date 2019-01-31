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

