// 全局对象
// __filename 它将输出文件所在位置的绝对路径
console.time('获取数据')
console.log(__filename)

// __dirname  表示当前执行脚本所在的目录。
console.log(__dirname)

// console

// process process 是一个全局变量，即 global 对象的属性。它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。
// **1.exit 当进程准备退出时触发。

process.on('exit', (code) => {
    setTimeout(function() {
        console.log('你到底能不能执行啊？？')
    }, 0)
    console.log('退出码为：', code)
})

console.timeEnd('获取数据')
console.info('程序执行完毕。')

// **2.process 属性 stdout stdin stderr argv execPath execArgv env ...

console.log(process.argv)
    // console.log(process.env)