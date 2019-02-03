// 适配器模式
// 旧接口格式和使用者不兼容
// 中间加一个适配转换接口

class Adaptee {
    specificRequest() {
        return '德国标准的插头'
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee()
    }
    request() {
        let info = this.adaptee.specificRequest();
        return `${info} -> 转换器 -> 中国标准的插头 `
    }
}

// 测试
let target = new Target();
target.request();

// 场景
// 封装旧接口
// vue computed