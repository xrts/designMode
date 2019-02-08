import  $ from 'jquery';
import ShoppingCatr from './ShoppingCart/ShoppingCart';
import List from  './List/List'

export default  class App {
    constructor(id) {
        this.$el = $('#' + id)
    }
    init() {
        this.initShoppingCart();
        this.initList()
    }
    // 初始化购物车
    initShoppingCart() {
        let shoppingCart = new ShoppingCatr(this);
        shoppingCart.init()

    }
    // 初始化列表
    initList() {
        let list = new List(this);
        list.init()

    }
}