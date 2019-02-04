// 迭代器模式
// 顺序访问一个集合
// 使用者无需知道集合的内部结构 ( 封装 )

let arr = [1,2,3];
let nodeList = document.getElementsByTagName('a');
let $a  = $('a');

// 遍历的传统方法
// // 遍历数组
// arr.forEach(function(item) {
//     console.log(item);
// });
//
// // 遍历 nodeList
// let i, length = nodeList.length;
// for (i=0; i < length; i++) {
//     console.log(nodeList[i])
// }
//
// // 遍历 $a
// $a.each(function(key, elem) {
//     console.log(key, elem)
// });

// 迭代器模式方式
// 使用者不必知道集合的内部结构
function each(data) {
    let $data = $(data); // 生成迭代器
    $a.each(function(key, elem) {
        console.log(key, elem)
    })
}

// 迭代器模式(code)
class Iterator {
    constructor(container) {
        this.list = container.list;
        this.index = 0
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
    hasNext() {
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}
class Container {
    constructor(list) {
        this.list = list
    }
    // 生成遍历器
    getIterator() {
        return new Iterator(this)
    }
}

let arr = [1,2,3,4,5,6];
let container = new Container(arr);
let iterator = container.getIterator();
while(iterator.hasNext()) {
    console.log(iterator.next())
}

// 使用场景
// jQuery each

// ES6 Iterator
// ES中,有序集合的数据类型已经有很多
// Array Map Set String TypedArray arguments NodeList
// 需要有一个统一的遍历接口来遍历所以数据类型
// (注意: object不是有序集合,可以用Map代替)
// 以上数据类型,都有[Symbol.iterator]属性
// 属性值是函数,执行函数返回一个迭代器
// 这个迭代器就有 next 方法可顺序迭代子元素
// 可运行 Array.prototype[Symbol.iterator] 来测试

function each(data) {
    // 生成遍历器
    let iterator = data[Symbol.iterator]();

    // console.log(iterator.next()); // 有数据时返回 { value: 1, done: false}
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next()); // 没数据是返回 { value: undefined, done: true }

    let item = {done: false};
    while (!item.done) {
        item = iterator.next();
        if (!item.done) {
            console.log(item.value)
        }
    }
}

// 'Symbol.iterator' 并不是人人都知道
// 也不是每个人都需要封装一个 each 方法
// 因此有了 'for of' 语法
function each(data) {
    for (let item of data) {
        console.log(item)
    }
}
each(arr);
each(nodeList);
each($a);