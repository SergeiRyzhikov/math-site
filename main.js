const aFunction = document.querySelector('a.function')
const aHome = document.querySelector('a.home')
const aSquareEquation = document.querySelector('a.squareEquation')
const aInformation = document.querySelector('a.information')

// adaptive margin divContent
const navHeight = document.querySelector('nav').offsetHeight
const divContent = document.querySelector('.content')
divContent.style.marginTop = `${navHeight}px`
window.onresize = function( event ) {
    const navHeight = document.querySelector('nav').offsetHeight
    console.log(navHeight)
    divContent.style.marginTop = `${navHeight}px`
}

aFunction.addEventListener('click', (event) => {
    event.preventDefault()
    document.location.href = 'https://sergeiryzhikov.github.io/math-site/function/function.html'
})

aHome.addEventListener('click', (event) => {
    event.preventDefault()
    document.location.href = 'https://sergeiryzhikov.github.io/math-site'
})
aSquareEquation.addEventListener('click', (event) => {
  event.preventDefault()
  document.location.href = 'https://sergeiryzhikov.github.io/math-site/squareEquation/equation.html'
})

aInformation.addEventListener('click', (event) => {
  event.preventDefault()
  document.location.href = 'https://sergeiryzhikov.github.io/math-site/information/information.html'
})

// nav scroll
var prevScrollpos = window.pageYOffset
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset
  if (prevScrollpos > currentScrollPos) {
    document.querySelector("nav").style.top = "0";
  } else {
    document.querySelector("nav").style.top = "-12%";
  }
  prevScrollpos = currentScrollPos
}

// change time for ege

// change word 
function changeWord(number, word) {
  if (number === 0) {return ''}
  if (word === 'секунд' || 'минут') {
    var word1 = `${word}`
    var word2 = `${word}ы`
    var word3 = `${word}а`
  }
  if (word === 'день') {
    var word1 = 'дней'
    var word2 = 'дня'
    var word3 = 'день'
  }
  if (word === 'час') {
    var word1 = 'часов'
    var word2 = 'часа'
    var word3 = 'час'
  }
  const lastCharacter = number.toString().slice(-1)
  for (let i = 5; i < 21; i++){if (number === i) {return `${number} ${word1}`}}
  for (let i = 2; i < 5; i++){if (lastCharacter === i.toString()) {return `${number} ${word2}`}}
  for (let i = 5; i < 10; i++){if (lastCharacter === i.toString()) {return `${number} ${word1}`}}
  if (lastCharacter === '0') {return `${number} ${word1}`}
  if (lastCharacter === '1') {return `${number} ${word3}`}
}
// differnce time
const timeEge = new Date(2022, 6, 2, 10, 0, 0, 0)
const pTime = document.querySelector('.time')
function changeTime () {
  const timeNow = new Date()
  const differenceSec = Math.round((timeEge - timeNow)/1000)

  const differnceDays = Math.trunc(differenceSec/86400)
  let restSec = differenceSec - differnceDays*86400

  const differnceHours = Math.trunc(restSec/3600)
  restSec = restSec - differnceHours*3600

  const differnceMin = Math.trunc(restSec/60)
  restSec = restSec - differnceMin*60

  pTime.textContent = `${changeWord(differnceDays, 'день')}
  ${changeWord(differnceHours, 'час')}
  ${changeWord(differnceMin, 'минут')}
  ${changeWord(restSec, 'секунд')}`
}
// function onload
onload = changeTime()
// every 1 second change time
setInterval(changeTime, 1000)
