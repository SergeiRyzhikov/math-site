// get value of numbers after comma
const fraction = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) )
// get elements
const form = document.querySelector('form')
const divAnswer = document.querySelector('.answer')
const pAnswer = document.querySelector('.pAnswer')
const divEquation = document.querySelector('.answerEquation')
const divInputs = document.querySelector('.inputs')
const pX1 = document.querySelector('.x1')
const pX2 = document.querySelector('.x2')
const footer = document.querySelector('footer')

footer.style.marginTop = '30%'
form.addEventListener('submit', equation)

function solve(a, b, c) {
    divAnswer.style.display = 'block'
    pX1.textContent = ''
    pX2.textContent = ''
    
    const D = b**2 - 4*a*c
    console.log(D)
    
    if (D >= 0) {
        console.log(D)
        const x1 = ((-b + (D**0.5))/(2*a))
        const x2 = ((-b - (D**0.5))/(2*a))
        console.log(x1, x2)

        if (x1 === x2) {pX1.textContent = `x = ${x1}`}
        else {
            if (fraction(x1) > 5) {
                // pX1.innerHTML = `<p> x1 = (${-b} + √<span style="border-top: 1px black solid;">${D}</span>)/(${2*a}) ≈ <span style="color:rgba(8, 41, 54, 0.8); font-size: 1.4em;">${Math.round(x1*100)/100}<span/> </p>`
                pX1.innerHTML = `<p> $$x1 = { ${-b} + \\sqrt{${D}} \\over ${2*a}} ≈ ${Math.round(x1*100)/100}$$ </p>`
                // pX1.innerHTML = '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
            }
            else {pX1.textContent = `x1 = ${x1}`}

            if (fraction(x2) > 5) {
                pX2.innerHTML  = `<p> $$x2 = { ${-b} - \\sqrt{${D}} \\over ${2*a}} ≈ ${Math.round(x2*100)/100}$$ </p>`
            }
            else {pX2.textContent += ` x2 = ${x2}`}          
        }
    }
    if (D < 0) {pX1.textContent = `Действительных корней нет`}

    // make symbols
    const numbers = [String(a), String(b), String(c)]

    for (let i = 0; i < 3; i++) {
        if (numbers[i].slice(0, 1) !== '-' && i !== 0)
            {numbers[i] = `+ ${numbers[i]}`}
    }
    // display equation
    MathJax.typeset.apply();
    divEquation.innerHTML = `<p class="answerEquation">${numbers[0]}x<sup>2</sup> ${numbers[1]}x ${numbers[2]} = 0</p>`
}

function equation(event) {
    event.preventDefault()
    divAnswer.style.display = 'none'
    const numbers = []

    for (let i = 0; i < 3; i++) {
        const divInput = document.getElementById(`${i}`)
        const number1 = parseFloat(divInput.value.replace(',', '.'))
        if (number1) {numbers.push(number1)}
        else {divInput.value = ''}
    }
    console.log(numbers.length)
    if (numbers.length < 3) {
        alert('Вводить можно только цифры!')
        return
    }
    console.log(numbers)
    solve(numbers[0],  numbers[1], numbers[2])
}