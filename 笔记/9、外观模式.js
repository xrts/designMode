// 外观模式
// 为子系统中的一组接口提供了一个高层接口
// 使用者使用这个高层接口

function bindEvent(elem, type, selector, fn) {
    if (fn === null) {
        fn = selector;
        selector = null
    }
    // ********
}

// 调用
bindEvent(elem, 'click', '#div1', fn);
bindeEvent(elem, 'click', fn);