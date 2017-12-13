var http = require('http')
var url = require('url')

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname
        var postData = ''
        console.log('Request for ' + pathname + 'Received.')
        route(handle, pathname, response, request)
            // response.writeHead(200, { 'Content-Type': 'text/plain' })
            // route(handle, pathname, response)
    }

    http.createServer(onRequest).listen(8888)
    console.log('Server has started.')
}

exports.start = start