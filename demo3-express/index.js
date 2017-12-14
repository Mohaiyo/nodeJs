let express = require('express')
let app = express()
let bodyParser = require('body-parser')
var fs = require('fs')
var multer = require('multer')
var cookieParser = require('cookie-parser')
    // app.use(express.static('./public'))

app.use(cookieParser())

// application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(multer({ dest: '/tmp/' }).array('image'))

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
})

app.get('/index2.html', (req, res) => {
    res.sendFile(__dirname + '/' + 'index2.html')
})

app.get('/upload.html', function(req, res) {
    res.sendFile(__dirname + '/' + 'upload.html')
})

app.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies)
    console.log('主页的GET请求')
    res.send('Hello NodeJs')
})

app.post('/', (req, res) => {
    console.log('主页POST请求')
    res.send('Hello This is a Post request')
})

app.get('/del_user', (req, res) => {
    console.log('del_user 响应DELETE请求')
    res.send('删除页面')
})

app.get('/list_user', (req, res) => {
    console.log('list_user 响应GET 请求')
    res.send('用户列表页面')
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', (req, res) => {
    console.log('/ab*cd GET 请求')
    res.send('正则匹配')
})

app.get('/process_get', (req, res) => {
    var response = {
        'first_name': req.query.first_name,
        'last_name': req.query.last_name
    }
    console.log(response)
    console.log('/ab*cd GET 请求')
    res.end(JSON.stringify(response))
})

app.post('/process_post', urlencodedParser, function(req, res) {

    // 输出 JSON 格式
    var response = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
})

app.post('/file_upload', function(req, res) {
    console.log(req.files[0]); // 上传的文件信息

    var des_file = __dirname + '/' + req.files[0].originalname
    fs.readFile(req.files[0].path, function(err, data) {
        fs.writeFile(des_file, data, function(err) {
            if (err) {
                console.log(err)
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                }
            }
            console.log(response)
            res.end(JSON.stringify(response))
        })
    })
})

let server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port
    console.log('应用实例，访问实例地址为http://%s:%s', host, port)
})