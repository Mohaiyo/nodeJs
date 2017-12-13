console.info("程序开始执行：");
var counter = 10;
console.log("计数: %d", counter);
console.time("获取数据");

var events = require("events")
var eventEmitter = new events.EventEmitter();

var listener1 = function listener1() {
    console.log("监听器listener1执行。")
}
var listener2 = function listener2() {
    console.log("监听器listener2执行。")
}

eventEmitter.addListener("connection", listener1)

eventEmitter.on("connection", listener2)

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

eventEmitter.emit("connection")

eventEmitter.removeListener("connection", listener1)

console.log("listener1不在接受监听")

eventEmitter.emit("connection")

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");

console.log(__filename);

console.log(__dirname);

//
// 执行一些代码
// 
console.timeEnd('获取数据');

console.info("程序执行完毕。")