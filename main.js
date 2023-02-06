const defaultColor = '#333333'
const defaultMode = 'color'
const defaultSize = 16

const colorPicker = document.getElementById('colorPicker')
console.log(colorPicker);
console.log(document.getElementById('colorPicker'))

const modeColor = document.getElementById("btn-color-mode")

const btnRainbow = document.getElementById("rainbow-mode")
const btnEraser = document.getElementById("eraser")
const btnClear = document.getElementById("clear")
const sizeValue = document.getElementById("size-value")
const range = document.getElementById("range")
const grid = document.getElementById("grid")

let currentColor = defaultColor
let currentMode = defaultMode
let currentSize = defaultSize



let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        btnRainbow.classList.remove('active')
    } else if (currentMode === 'color') {
        modeColor.classList.remove('active')
    } else if (currentMode === 'eraser') {
        btnEraser.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        btnRainbow.classList.add('active')
    } else if (newMode === 'color') {
        modeColor.classList.add('active')
    } else if (newMode === 'eraser') {
        btnEraser.classList.add('active')
    }
}

window.onload = () => {
  setupGrid(defaultSize)
  activateButton(defaultMode)
}

function setCurrentColor(newColor) {
    currentColor = newColor
}
  
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}
  
  function setCurrentSize(newSize) {
    currentSize = newSize
}

  function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

colorPicker.oninput = (e) =>setCurrentColor(e.target.value)
modeColor.onclick = () => setCurrentMode('color')
btnRainbow.onclick = () => setCurrentMode('rainbow')
btnEraser.onclick = () => setCurrentMode('eraser')
btnClear.onclick = () => reloadGrid()
range.onmousemove = (e) => updateSizeValue(e.target.value)
range.onchange = (e) => changeSize(e.target.value)