//Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。
// 所有这些产生事件的对象都是 events.EventEmitter 的实例。
// 使用EventEmitter
var EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();
event.on("some_event",()=>{
    console.log('some_event时间触发')
})
setTimeout(function() {
    event.emit('some_event')
}, 1000);
//EventEmitter 提供了多个属性，如 on 和 emit。on 函数用于绑定事件函数，emit 属性用于触发一个事件。
//1.addListener(event, listener) 为指定事件添加一个监听器到监听器数组的尾部。

//2.on(event, listener)  为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。  1与2应该是等价的

//3.once(event, listener) 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。

//4.removeListener(event, listener) 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。

//5.removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

// 6.setMaxListeners(n) 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。

// 7.listeners(event)  返回指定事件的监听器数组。

//8. emit(event, [arg1], [arg2], [...]) 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

// 实例
// 监听器 #1
var listener1 = ()=> {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = ()=> {
  console.log('监听器 listener2 执行。');
}

// 为 connection 事件添加一个监听器，处理函数为 listener1 
var eventC = event.addListener('connection', listener1);

console.log(eventC)

// 绑定 connection 事件，处理函数为 listener2
var eventD = event.on('connection', listener2);
console.log(eventD)


var eventListeners = EventEmitter.listenerCount(event,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

var eventListeners1 = EventEmitter.listenerCount(event,'some_event');
console.log(eventListeners1 + " 个监听器监听some_event事件。");

// 处理 connection 事件 
event.emit('connection');

// 移除监绑定的 listener1 函数
event.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

eventListeners = EventEmitter.listenerCount(event,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");
console.log("程序执行完毕。");

// 继承 EventEmitter
// 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、stream、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
// 为什么要这样做呢？原因有两点：
// 首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。
// 其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。