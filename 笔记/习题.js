// one
// 打车时,可以打专车或者快车.任何车都有车牌号和名称
// 不同车价格不同,快车1元一公里,专车2元一公里
// 行程开始,显示车辆信息
// 行程结束,显示打车金额(假定行程5公里)

class Car {
    constructor(number, name) {
        this.number = number;
        this.name = name
    }

}
class FastCar extends Car {
    constructor(number,name){
        super(number,name);
        this.price = 1;
    }
}
class SpecialCar extends Car {
    constructor(number,name){
        super(number,name);
        this.price = 2;
    }
}

class Trip {
    constructor(car) {
        this.car = car
    }
    start() {
        console.log(`行程开始,名称:${this.car.name},车牌号:${this.car.price}`)
    }
    end() {
        console.log(`行程结束,价格: ${this.car.price * 5}`)
    }
}
let car = new FastCar(100,'奔驰');
let trip = new Trip(car);
trip.start();
trip.end();

// two
// 某停车场,分三层,每层100车位
// 每个车位都能被监控到车辆的驶入和离开
// 车辆进入前,显示每层的空余车位数量
// 车辆进入时,摄像头可识别车牌号和时间
// 车辆出来时,出口显示车牌号和停车时长

// 车辆
class Car {
    constructor(num){
        this.num = num // 车牌号
    }
}

// 摄像头
class Camera {
    shot(car) {
        return {
            num: car.num,
            inTime:Date.now()
        }
    }
}
// 层
class Floor {
    constructor(index, places) {
        this.index = index;
        this.places = places || []
    }
    emptyPlaceNum() {
        let num = 0;
        this.places.forEach((val) => {
            if(val.empty) {
                num ++ ;
            }
        });
        return num;
    }
}

// 车位
class Place {
    constructor() {
        this.empty = true
    }
    in() {
        this.empty = false
    }
    out() {
        this.empty = true
    }
}

// 出口显示器
class Screen {
    show(car, inTime) {
        console.log('车牌号', car.num);
        console.log('停车时间',Date.now() - inTime)
    }
}

// 停车场
class Park {
    constructor(floors){
        this.floors = floors || [];
        this.camera = new Camera();
        this.screen = new Screen();
        this.carList = {} // 存储摄像头拍摄返回的车辆信息
    }
    in(car) {
        // 通过摄像头获取信息
        const info = this.camera.shot(car);
        // 停到某个停车位
        const i = parseInt(Math.random()*100%100);// 获取1-100的随机数
        const place = this.floors[0].places[i];
        place.in();
        info.place = place;
        // 记录信息
        this.carList[car.num] = info

    }
    out(car) {
        // 获取信息
        const info = this.carList[car.num];
        // 将停车位清空
        const place = info.place;
        place.out();
        // 显示时间
        this.screen.show(car, info.inTime);
        // 清空记录
        delete this.carList[car.num]
    }
    emptyNum() {
        return this.floors.map(floor => {
            return `${floor.index} 层还有 ${floor.emptyPlaceNum()} 个空闲字符`
        }).join('\n')
    }
}

// 测试---------------------
// 初始化停车场
const floors = [];
for (let i = 0; i < 3; i++) {
    const places = [];
    for (let j = 0; j < 100; j++) {
        places[j] = new Place()
    }
    floors[i] = new Floor(i+1, places)
}
const park = new Park(floors);

// 初始化车辆
const car1 = new Car(100);
const car2 = new Car(200);
const car3 = new Car(300);

console.log('第一辆车进入');
console.log(park.emptyNum());
park.in(car1);
console.log('第二辆车进入');
console.log(park.emptyNum());
park.in(car2);
console.log('第一辆车离开');
park.out(car1);
console.log('第二辆车离开');
park.out(car2);
