/**
 * buffer 缓存对象  
 * 纯粹的Javascript 对Unicode 很友好，但是操作二进制数据就不怎么在行了。处理TCP 数据流或者文件时，必须要操作二进制数据流。node 提供了一些方法来创建、操作和接收二进制数据流。
 * Buffer 对象是全局对象
 * 一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存
 * ps:在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用 Buffer.from() 接口去创建Buffer对象。
 */

// # 1.Buffer 与字符编码
/* Node.js 目前支持的字符编码包括：
ascii - 仅支持 7 位 ASCII 数据。 如果设置去掉高位的话， 这种编码是非常快的。
utf8 - 多字节编码的 Unicode 字符。 许多网页和其他文档格式都使用 UTF - 8。
utf16le - 2 或 4 个字节， 小字节序编码的 Unicode 字符。 支持代理对（ U + 10000 至 U + 10 FFFF）。
ucs2 - utf16le 的别名。
base64 - Base64 编码。
latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
binary - latin1 的别名。
hex - 将每个字节编码为两个十六进制字符 */
const buf = Buffer.from('nodeJs', 'ascii')
console.log(buf)
console.log(buf.toString('utf8'))
console.log(buf.toString('base64'))

// # 2.创建 Buffer 类
/* Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例， 如果没有设置 fill， 则默认填满 0
Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例， 但是它不会被初始化， 所以它可能包含敏感的数据
Buffer.allocUnsafeSlow(size)
Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（ 传入的 array 的元素只能是数字， 不然就会自动被 0 覆盖）
Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
Buffer.from(buffer)： 复制传入的 Buffer 实例的数据， 并返回一个新的 Buffer 实例
Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例 */

// 创建一个长度为 7 且用 0 填充的Buffer。
const buff1 = Buffer.alloc(7)
console.log(buff1)
    // 创建一个长度为 7 且用 0x1 填充的 Buffer。
const buff2 = Buffer.alloc(7, 1)
console.log(buff2)

const buff3 = Buffer.alloc(7, 2, 'utf8')
console.log(buff3)

// 创建一个长度为 7、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buff4 = Buffer.allocUnsafe(7) // 会包含旧数据
console.log(buff4)
buff4.fill(2)
console.log(buff4)

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buff5 = Buffer.from([1, 2, 3])
console.log(buff5)

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buff6 = Buffer.from('tést')
console.log(buff6)

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buff7 = Buffer.from('tést', 'latin1')
console.log(buff7)

// # 3.写入缓冲区

/* 写入 Node 缓冲区的语法如下所示：
buf.write(string[, offset[, length]][, encoding]) */

let buf8 = Buffer.alloc(10)
len = buf8.write('www.mohaiyo.com')
console.log(buf8)
console.log('写入字节数为：' + len)

// # 4.从缓冲区读取数据

/* 读取 Node 缓冲区数据的语法如下所示：
buf.toString([encoding[, start[, end]]]) */

console.log(buf8.toString('ascii'))

// # 5.将 Buffer 转换为 JSON 对象  buf.toJSON()

let buf9 = Buffer.from('www.mohaiyo.com')
let json = buf9.toJSON(buf9)
console.log(json)

// # 6.缓冲区合并  Buffer.concat(list[, totalLength])

let buf10 = Buffer.from('nodeJs教程')
let buf11 = Buffer.from('www.mohaiyo.com')
let buf13 = Buffer.concat([buf10, buf11])
console.log(buf13.toString())
let buf14 = Buffer.concat([buf10, buf11], 15)
console.log(buf14.toString())

// # 7.缓冲区比较  buf.compare(otherBuffer)

// # 8.拷贝缓冲区  buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
buf11.copy(buf10, 2, 1, 6)
console.log(buf10.toString())

// # 9.缓冲区裁剪 buf.slice([start[, end]])

let buf15 = buf10.slice(1, 3)
console.log(buf15.toString())