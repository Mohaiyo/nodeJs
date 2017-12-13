var events =require("events")
var fs = require("fs");

var eventEmitter = new events.EventEmitter()

let connectHandler = function connected() {
	console.log("链接成功")

	eventEmitter.emit("data_received")
}

eventEmitter.on("connection",connectHandler);

eventEmitter.on("data_received",function(){
	console.log("数据接收成功")
})

eventEmitter.emit("connection")


fs.readFile('input.txt', function(error,data){
	if(error){
		console.log(error.stack)
		return
	}
	console.log(data.toString())

});

console.log("程序执行完毕")