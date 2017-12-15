let MongoClient = require('mongodb').MongoClient
let DB_CONN_STR = 'mongodb://localhost:27017/nodejs'

let insertData = (db, callback) => {

    // 链接到表site
    // let collection = db.collection('nodejs')

    // 插入数据
    let data = [{ 'name': 'nodejs教程', 'url': 'www.nodejs.com' }, { 'name': 'nodejs工具', 'url': 'www.nodejstool.com' }]
    collection.insert(data, (err, result) => {
        if (err) {
            console.log('Error' + err)
            return
        }
        callback(result)
    })
}

MongoClient.connect(DB_CONN_STR, (err, db) => {
    console.log('mongodb数据库连接成功！')
    insertData(db, (result) => {
        console.log(result)
        db.close()
    })
})