// 设计原则

// linux
// 准则1: 小即是美
// 准则2: 让每个程序只做好一件事
// 准则3: 快速建立原型
// 准则4: 舍弃高效率而取可移植性
// 准则5: 采用纯文本来存储数据
// 准则6: 充分利用软件的杠杆效应(软件复用)
// 准则7: 使用shell脚本来提高杠杆效应和可移植性
// 准则8: 避免强制性的用户界面
// 准则9: 让每个程序都称为过滤器

// 小准则: 允许用户定制环境
// 尽量使操作系统内核小而轻量化
// 使用小写字母并尽量简短
// 沉默是金
// 各部分之和大于整体
// 寻求90%的解决方案

// 五大设计原则 SOLID
// S - 单一职责原则
    // 就一个类而言，应该仅有一个引起它变化的原因
// O - 开放封闭原则
    // 对扩展开放,对修改封闭
    // 增加需求时,扩展新代码,而非修改已有代码
    // 这是软件设计的终极目标
// L - 李氏置换原则
    // 子类型必须能够替换它们的父类型
// I - 接口独立原则
    // 保持接口的单一独立,避免出现"胖接口"
    // js中没有接口,使用较少
    // 类似于单一职责原则,这里更关注接口
// D - 依赖导致原则
    // 面向接口编程,依赖于抽象，不要依赖于具体
    // 要求对抽象进行编程，不要对实现进行编程
    // 使用方只关注接口而不关注具体类的实现
    // js中使用较少( 没有接口 & 弱类型 )

// 设计原则总结
// S O 体现多
// L I D 体现少

// S O 代码 示例
function loadImg(src) {
    let promise = new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = src;
        img.onload = function () {
            resolve(img)
        };
        img.onerror = function () {
            reject('图片加载失败')
        }
    });
    return promise;
}

let src = 'http://1.jpg';
let result = loadImg(src);

result.then(function (img) {
    // part1
    alert(`width: ${img.width}`);
    return img
}).then(function (img) {
    // part2
    alert(`height: ${img.height}`)
}).catch(function(ex) {
    alert(ex)
});
