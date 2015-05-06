'use strict'

const EventEmitter = require('events').EventEmitter  //requerimos la clase EventEmitter del modulo event
const async = require('async')
const dataURIBuffer = require('data-uri-to-buffer')
const uuid = require('uuid')//fucniona en el server y el browser..se pued eusar con browserify
const os = require('os') //me da cceso al sistema operativo
const fs = require('fs')//acceso archivos
const path = require('path')//organizar ruta archivos

//gestor de eventos
module.exports = function (images) {
    let events = new EventEmitter()
    let count = 0
    let baseName = uuid.v4()
    let tmpDir = os.tmpDir() //temporal del sistema operativo

    //decodificar de formato Web convertir a buffer
    //que me permiteal sistema de archivos

     //lo ejecutamos de forma secuencial
    async.series([
        decodeImages,
        createVideo,
        encodeVideo,
        cleanup
    ], convertFinished) //como callBack convertFinished

    // Decode images to files
   //es un arreglo..entonces toca codificar imagenes por separado oea operacion asocrona
    //el callBack se ejecuta cuando la funcon temrine
    function decodeImages (done) {
        async.eachSeries(images, decodeImage, done)  //decodeImage callback para que hacer con cada imagen  --
        // serial ..para que procede en orden.. porque el each solo procesa en desorden
        done()
    }
    // Decode a  image
    function decodeImage (image, done) {
        let fileName = `${baseName}-${count++}.jpg`
        let buffer = dataURIBuffer(image)
        let ws = fs.createWriteStream(path.join(tmpDir, fileName))

        ws.on('error', done)
            .end(buffer, done)//cuando temirne de pasar el buffer ejecuta el done y guarde todo en el dico duro

        events.emit('log', `Converting ${fileName}`)
    }

    // Create video from images with ffmpeg
    function createVideo (done) {
        done()
    }

    // Encode video
    function encodeVideo (done) {
        done()
    }

    // Cleanup temp folder
    function cleanup (done) {
        done()
    }

    // Convertion finished
    function convertFinished (err) {
        setTimeout(function () {
            events.emit('video', 'this will be the encoded video')
        }, 500)
    }

    //Simularemos funcion asincrona
  /*setTimeout(function () {
    events.emit('video', 'this will be the encoded video')  //emitir evento llamado video con una adena de texto
  }, 1000)
*/
  return events
}
