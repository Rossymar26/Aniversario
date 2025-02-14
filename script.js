

const urlSearchParams = new URLSearchParams(window.location.search)
const messageCustom = urlSearchParams.get('message')

if (messageCustom) {
  const mainMessageElement = document.querySelector('#mainMessage')
  mainMessageElement.textContent = decodeURI(messageCustom)
}


const btnOpenElement = document.querySelector('#open')
const btnCloseElement = document.querySelector('#close')
btnCloseElement.disabled = true


let heartInterval

btnOpenElement.addEventListener('click', () => {
  btnOpenElement.disabled = true
  btnCloseElement.disabled = false
  const coverElement = document.querySelector('.cover')
  coverElement.classList.add('open-cover')

  setTimeout(() => {
    coverElement.style.zIndex = -1

    const paperElement = document.querySelector('.paper')
    paperElement.classList.remove('close-paper')
    paperElement.classList.add('open-paper')

    heartInterval = setInterval(() => {
      const container = document.querySelector('.container-letter')
      const heart = document.createElement('span')
      heart.classList.add('heart')
      heart.textContent = '♥'
      heart.style.position = 'absolute'
      // Posición horizontal aleatoria
      heart.style.left = Math.random() * 90 + '%'
      
      heart.style.top = '0%'
      heart.style.display = 'block'
      // Asegura que el corazón quede por encima de los demás elementos
      heart.style.zIndex = '10'
      // Duración aleatoria entre 2 y 4 segundos para la animación
      const duration = Math.random() * 2 + 2
      heart.style.animation = `floatUp ${duration}s linear forwards`
      container.appendChild(heart)

      // Elimina el corazón una vez finalizada la animación
      setTimeout(() => {
        heart.remove()
      }, duration * 1000)
    }, 300) // Se crea un corazón cada 300ms

  }, 500)
})

btnCloseElement.addEventListener('click', () => {
  btnOpenElement.disabled = false
  btnCloseElement.disabled = true

  // Detiene la generación de nuevos corazones
  clearInterval(heartInterval)

  const coverElement = document.querySelector('.cover')
  const paperElement = document.querySelector('.paper')
  paperElement.classList.remove('open-paper')
  paperElement.classList.add('close-paper')

  setTimeout(() => {
    coverElement.style.zIndex = 0
    coverElement.classList.remove('open-cover')

    // Elimina todos los corazones que pudieran quedar en pantalla
    const hearts = document.querySelectorAll('.container-letter .heart')
    hearts.forEach(heart => heart.remove())
  }, 500)
})
