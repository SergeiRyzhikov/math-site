function ctag(x) { return 1 / Math.tan(x) }
// main scale (first)
var scale = 10

onload = draw()

const form = document.querySelector('form')
form.addEventListener('submit', form1)

const colors = {
    0: 'green',
    1: 'yellow',
    2: 'rgb(255, 62, 165)',
    3: 'tomato',
    4: 'blue',
}
// delete value input
function del(index, elmnt, event) {
    event.preventDefault()
    console.log(elmnt)
    const delInput = document.getElementById(index)
    delInput.value = ''
    form1(event)
}
// make new scale
function findScale(change) {
    const currentScale = scale
    if (currentScale === 2) {
        if (change === "-") {return 5}
        else {return 2}
    }
    if (currentScale === 200) {
        if (change === "+") {return 100}
        else {return 200}
    }
    if (currentScale === 5) {
        if (change === "-") {return 10}
        else {return 2}
    }
    if (currentScale === 10) {
        if (change === "-") {return 20}
        else {return 5}
    }    
    if (currentScale === 20) {
        if (change === "-") {return 50}
        else {return 10}
    }
    if (currentScale === 50) {
        if (change === "-") {return 100}
        else {return 20}
    } 
    if (currentScale === 100) {
        if (change === "-") {return 200}
        else {return 50}
    }
}
// event listener to change scale
function changeScale(change, event) {
    event.preventDefault()  
    scale = findScale(change)
    form1(event)     
}

function draw() {
    const canvas = document.querySelector('canvas')
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        grid(ctx, canvas, 10)
        }
    }
        
function form1(event) {
    event.preventDefault()

    const input = document.querySelectorAll('input')
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    
    grid(ctx, canvas, scale)

    for (let i=0; i < input.length; i++) {
        rule = input[i].value
        if (rule) {
            const id = input[i].id
            console.log(rule, colors[id])
            func(ctx, rule, colors[id])
        }
    }
}

function grid(ctx, canvas, scale) {
    canvas.width = 660
    canvas.height = 660

    const normal = 10
    const difference = scale/normal

    ctx.beginPath()
    ctx.rect(0, 0, 600, 600)
    ctx.lineWidth = 0.3
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    for(let i = 1; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i*60)
        ctx.lineTo(600, i*60)
        ctx.stroke()

        ctx.font = '20px black'
        ctx.textAlign = 'center'
        ctx.baseLine = 'top'

        ctx.fillText(String(Math.round((i*difference-scale/2) * 100) / 100 ), i*60, 620)

    }

    for(let i = 1; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo(i*60, 0)
        ctx.lineTo(i*60, 600)
        ctx.stroke()

        ctx.font = '20px black'
        ctx.textAlign = 'center'
        ctx.baseLine = 'top'

        ctx.fillText(String(Math.round((scale/2 - i*difference) * 100) / 100 ), 620, i*60)
    }
    ctx.beginPath()
    ctx.moveTo(0, 300)
    ctx.lineTo(600, 300)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(300, 0)
    ctx.lineTo(300, 600)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.stroke()
}
function getArray(start, end){
    const difference = (end-start)/599
    console.log(difference)
    let xFirst = []
    let j = start
    for(let i=0; i<600; i++) {
        xFirst.push(j)
        j += difference       
    }
    return xFirst
}

function moving(ctx, xCoords, yCoords) {
    for (let i=0; i < xCoords.length; i++) {
        if (yCoords[i] <= 600 && yCoords[i] >= 0) {
            ctx.moveTo(xCoords[i], yCoords[i])
            return 
        }
    }
}

function building(ctx, xCoords, yCoords, color) {
    ctx.beginPath()
    moving(ctx, xCoords, yCoords)

    for (let i=0; i < xCoords.length; i++) {
        if (yCoords[i] <= 600 && yCoords[i] >= 0) {
            ctx.lineTo(xCoords[i], yCoords[i])
        }
        else {
            ctx.strokeStyle = color
            ctx.stroke() 
            xCoords.splice(0, i+1)
            yCoords.splice(0, i+1)
            return [xCoords, yCoords]      
        }
    }
    ctx.strokeStyle = color
    ctx.stroke()
    console.log('sd')
    return [[], []]
}
function makeRule(rule) {
    rule = rule.toLowerCase()
    console.log(rule)
    rule = rule.replace('pi', 'Math.PI')
    rule = rule.replace('e', 'Math.E')
    rule = rule.replace('sin', 'Math.sin')
    rule = rule.replace('^', '**')
    rule = rule.replace('cos', 'Math.cos')
    rule = rule.replace('exp', 'Math.exp')
    rule = rule.replace('ctg', 'ctag')
    rule = rule.replace('tg', 'Math.tan')
    return rule
}
function func(ctx, rule, color) {
    const start = -scale/2
    const end = scale/2

    const len = end - start
    const xFirst = getArray(start, end)
    let yCoords = []
    let xCoords = []

    rule = makeRule(rule)
    console.log(rule)
    for (let i=0; i < xFirst.length; i++) {
        let x = xFirst[i]
        yCoords.push(300 - (eval(rule))*(600/len) )     
        xCoords.push(x*(600/len) + 300)
    } 

    while (xCoords.length > 0) {
        [xCoords, yCoords] =  building(ctx, xCoords, yCoords, color)
    }
}
