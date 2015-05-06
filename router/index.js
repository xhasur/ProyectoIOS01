'use strict'

const path = require('path')
const course = require('course')
const st  = require('st')
const jsonBody = require('body/json')  //modulo bodyjsonbody metodo del modulo body
const router = course()
const helper = require('../helper') //requerimos el helper y nos trae el index.js


const mount= st({
    path:path.join(__dirname,'..','public'),
    index:'index.html', //defino archivo principal,
    passthrough: true // sino hay archivo en el servidor estatico no lanze error continue ejecucion
})

router.post('/process', function (req, res) {
    //lA peticion la  Modificamos
    jsonBody(req, res, {limit: 3 * 1024 * 1024 }, function (err, body) {//enviamos 3mb recibimos archivos hasta 3mb
        if (err) return fail(err, res)

        if (Array.isArray(body.images)) {
            let converter = helper.convertVideo(body.images)

            converter.on('video', function (video) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ video: video }))
            })

        } else {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'parameter `images` is required' }))
        }



         //console.log(body) //objeto como imagenes
        //cada que tenemos respuesta seteamos header con la respuesta
        //enviamos de lado a lado
        //res.setHeader('Content-Type', 'application/json')
        //res.end(JSON.stringify({ ok: true }))
})
})


function onRequest (req, res) {
    mount(req, res, function (err) {//servidor statio ruta statica
        if (err) return fail(err, res)

        router(req, res, function (err) {
            if (err) return fail(err, res)

            res.statusCode = 404
            res.end(`404 Not Found: ${req.url}`)
        })
    })
}


function fail (err, res) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end(err.message)
}


module.exports=onRequest