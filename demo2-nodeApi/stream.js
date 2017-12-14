// # Streams 流    所有的Stream 对象都是EventEmitter 的实例。
/* Node.js， Stream 有四种流类型：
 ** 1.Readable - 可读操作。
 ** 2.Writable - 可写操作。
 ** 3.Duplex - 可读可写操作.
 ** 4.Transform - 操作被写入数据， 然后读出结果。 
 */
/* 所有的 Stream 对象都是 EventEmitter 的实例。 常用的事件有：
 ** 1.data - 当有数据可读时触发。
 ** 2.end - 没有更多的数据可读时触发。
 ** 3.error - 在接收和写入过程中发生错误时触发。
 ** 4.finish - 所有数据已被写入到底层系统时触发。
 */

let fs = require('fs')
let data = ''

// 可读流 createReadStream

let rs = fs.createReadStream('./input.txt')

// 编码格式
rs.setEncoding('utf8')

rs.on('data', (chunk) => {
    data += chunk
})

rs.on('end', () => {
    console.log(data)
})

rs.on('error', (err) => {
    console.log(err)
    console.log(err.stack)
})

// 创建一个写入流
let data1 = '测试写入流'
let ws = fs.createWriteStream('./output.txt')

ws.write(data1, 'utf8')

// 处理流事件 --> data, end, and error
ws.on('finish', () => {
    console.log('写入成功以及完成写入!')
})

// 错误监听
ws.on('error', (err) => {
    console.log(err.stack)
})

// 管道流 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

rs.pipe(ws)
    // ws.end()

// 链式流 链式流一般用于管道操作。 压缩解压
console.log('程序执行完毕')