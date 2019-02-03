// 代理模式
// 使用者无权访问目标对象
// 中间加代理,通过代理做授权和控制

class RealImg {
    constructor(fileName) {
        this.fileName = filename;
        this.loadFromDisk() // 初始化即从硬盘中加载 (模拟)
    }
    display() {
        console.log('display...', + this.fileName)
    }
    loadFromDisk() {
        console.log('loading...'+this.fileName)
    }
}

class ProxyImg {
    constructor(fileName) {
        this.realImg = new RealImg(fileName)
    }
    display() {
        this.realImg.display()
    }
}

let proxyImg = new ProxyImg('1.png');
proxyImg.display();

// 场景
// 网页事件代理
// jQuery $.proxy
// ES6 Proxy

//$.proxy
$('#div').click(function() {
    setTimout($.proxy(function () {
        $(this).add('red')
    },this),1000)
});


// ES6 Proxy
// 明星
let star = {
    name: '张XX',
    age: 25,
    phone: '8888888'
};

// 经纪人
let agent = new Proxy(star, {
    get: function (target, key) {
        if (key === 'phone') {
            // 返回经纪人自己的手机号
            return '6666666'
        }
        if (key === 'price') {
            // 明星不保价,经纪人报价
            return 120000
        }
        return target[key]
    },
    set: function (target, key, val ) {
        if (key === 'customPrice') {
            if (val < 100000) {
                // 最低10W
                throw new Error('价格太低')
            } else {
                target[key] = val;
                return true
            }
        }
    }
});

// test
console.log(agent.name);
console.log(agent.phone);
console.log(agent.price);
agent.customPrice = 10;

// 代理模式 VS 适配器模式
// 适配器模式: 提供一个不同的接口 ( 如不同版本的插头 ) ( 使用者有权使用,但达不到想要的效果,所以通过适配器去达到与目标类一样的效果)
// 代理模式: 提供一模一样的接口 ( 使用者无权使用目标类 )

// 代理模式 VS 装饰器模式
// 装饰器模式: 扩展功能,原有功能不变且可直接使用 
// 代理模式: 显示原有功能,但是经过限制或者阉割之后的
