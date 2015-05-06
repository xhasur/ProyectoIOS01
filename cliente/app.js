const Webrtc2Images = require('webrtc2images')   //modulo para acceder a la camara //solo funciona en el browser no en el server
const xhr = require('xhr')

const rtc = new Webrtc2Images({
    width: 200,
    height: 200,
    frames: 10,
    type: 'images/jpeg',
    quality: 0.4,
    interval: 200
})

rtc.startVideo(function (err) {
    if (err) return logError(err)
})

const record = document.querySelector('#record')

record.addEventListener('click',  function (e) {
    e.preventDefault()

    rtc.recordVideo(function (err, frames) {
        if (err) return logError(err)

        xhr({
            uri: '/process',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },//llegara un json
            body: JSON.stringify({ images: frames }) //lque enviaremos los frames
        }, function (err, res, body) {
            if (err) return logError(err)

            console.log(JSON.parse(body))  //lo  qu devuelve el serer
        })
//        console.log(frames)
    })
}, false)

function logError (err) {
    console.error(err)
}
