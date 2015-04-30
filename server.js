'use strict'

const http = require('http')
const fs=require('fs')
const path=require('path')
const router=require('./router')
const port = process.env.PORT || 8888

const server = http.createServer()
//server.on('request',onRequest);
server.on('request',router);
server.on('listening',onListening);
server.listen(port)


//cadenas de texto que se utilizan como template  utiliza -->back tic
function onListening () {
    console.log(`Server running in port   ${port}`)
}



//req y resp son steams


 //cada que hacemos request nos entrega el index por eso lo comento todoo
/*
function onRequest (req, res) {

    let fileName= path.join(__dirname,'public','index.html')

    //stream de lectura a medida que tine los datos los muestra  en el response sin sobre cargar la memoria
    res.setHeader("Content-Type", "text/html");
    let rs=fs.createReadStream(fileName)
    rs.pipe(res)
    rs.on('error', function (err) {
    res.end(err.message)
     })

    //readFile carga archivo en memoria carga el buffer  y ejecuta el callback y se va el bloque por el response
        //esta seccion nooo
        fs.readFile(fileName, function (err,file) {
           if(err){
            return res.end(err.message)
           }
            res.setHeader("Content-Type", "text/html");
            res.end(file)
        })
         //fin seccion no

}
*/





//se comenta porque utilizaremos l fucion onRequest del index y del otro modulo
/*
function onRequest (req, res) {
    let uri = req.url

    if (uri.startsWith('/index') || uri === '/') return serveIndex(res)

    if (uri.startsWith('/app.js')) return serveApp(res)

    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`404 Not found: ${uri}`)
}

function serveIndex (res) {
    let index = path.join(__dirname, 'public', 'index.html')
    let rs = fs.createReadStream(index)

    res.setHeader('Content-Type', 'text/html')
    rs.pipe(res)

    rs.on('error', function (err) {
        res.setHeader('Content-Type', 'text/plain')
        res.end(err.message)
    })
}

function serveApp (res) {
    let app = path.join(__dirname, 'public', 'app.js')
    let rs = fs.createReadStream(app)

    res.setHeader('Content-Type', 'text/javascript')
    rs.pipe(res)

    rs.on('error', function (err) {
        res.setHeader('Content-Type', 'text/plain')
        res.end(err.message)
    })
}
*/




