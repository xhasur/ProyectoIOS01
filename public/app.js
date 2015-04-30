const record = document.querySelector('#record')// con js traigo el valor del boton

//agrego el evento
record.addEventListener('click', function (e) {
  e.preventDefault()
  console.log('Button clicked')
})
