// 系统中被唯一使用
// 一个类只有一个实例

// java
// public class SingleObject {
//     // 注意,私有化构造函数,外部不能new,只能内部new !!!
//     private SingleObject() {
//     }
//     // 唯一被 new 出来的对象
//     private SingleObject getInstance() {
//         if(instance == null) {
//             // 只能 new 一次
//             instance = new SingleObject();
//         }
//         return instance
//     }
//     // 对象方法
//     public void login(username, password) {
//         System.out.println("login...")
//     }
// }
//
// // 测试代码
// public class SingletonPatternDemo {
//     public static void main(String[] args) {
//         // 不合法的构造函数
//         // 编译时报错: 构造函数 SingleObject()是不可见的!!!
//         // SingleObject object = new SingleObject();
//
//         // 获取唯一可用对象
//         SingleObject object = SingleObject.getInstance();
//         object.login();
//     }
// }

// js
class SingleObject {
    login() {
        console.log('login...')
    }
}
// 静态方法:无论被实例化多少次都只有一个方法
SingleObject.getInstance = (function(){
    let instance;
    return function() {
        if (!instance) {
            instance = new SingleObject();
        }
        return instance
    }
})();

// 测试
let obj1 = SingleObject.getInstance();
obj1.login();
let obj2 = SingleObject.getInstance();
obj2.login();

console.log('obj1===obj2',obj1 === obj2);

// 场景
// jQuery 只有一个 $
// vuex 和 redux 中的 store
// 购物车、登录框

// 模拟登陆框
class loginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示');
            return
        }
        this.state = 'show';
        console.log('登录框已显示')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏');
            return
        }
        this.state = 'hide';
        console.log('登录框已隐藏')
    }
}

loginForm.getInstance = (function(){
    let instance;
    return function() {
        if (!instance) {
            instance = new loginForm();
        }
        return instance
    }
})();

// 设计原则验证
// 符合单一职责原则,只实例化唯一的对象
// 没法具体开放封闭原则,但是绝对不违反开放封闭原则
