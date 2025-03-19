// TODO Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent.
// TODO Use at least two Browser Object Model (BOM) properties or methods.  (One more to go)
// TODO Include a README file that contains a description of your application.
// TODO Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 

const board = document.getElementById("board")
const info = document.querySelector("#info-container")
const form = document.querySelector("form")
const msgEl = document.getElementById("msg")
const boardData = []
let match = -1
let isMismatched = false
let username = ""
let pairCount = 0
let cells

const pics = [
  {
    src: "assets/atlantic_sunset.jpg",
    instances: 0
  },
  {
    src: "assets/bk_bridge.jpg",
    instances: 0
  },
  {
    src: "assets/pexels-alexgtacar-745150-1592384.jpg",
    instances: 0
  },
  {
    src: "assets/pexels-luis-gomes-166706-546819.jpg",
    instances: 0
  },
  {
    src: "assets/pexels-padrinan-1272838.jpg",
    instances: 0
  },
  {
    src: "assets/pexels-pixabay-46148.jpg",
    instances: 0
  },
  {
    src: "assets/pexels-pixabay-161043.jpg",
    instances: 0
  },
  {
    src: "assets/pexels-pixabay-290386.jpg",
    instances: 0
  },
]

form.addEventListener("submit", play)

function play(evt) {
  evt.preventDefault()
  const userReg = /^\w+$/
  let userVal = evt.target.childNodes[1].value
  if(!userReg.test(userVal)) {
    alert("Your username must not contain any special characters or whitespace!")
    evt.target.childNodes[1].value = ""
    return
  }
  username = userVal
  form.style.display = "none"
  shuffle()
  renderBoard()
  // clearBoard()
}

function shuffle() {
  while(boardData.length < 16){
    const rand = Math.floor(Math.random() * 8)
    if(pics[rand].instances < 2) {
      boardData.push({
        id: rand,
        src: pics[rand].src,
        isPaired: false
      })
      pics[rand].instances++
    }
  }
}

function renderBoard() {
  board.style.display = "flex"
  boardData.forEach(srcData => {
    const cell = document.createElement("div")
    const pic = document.createElement("img")
    cell.setAttribute("class", `${srcData.id} cell`)
    cell.style.backgroundColor = "#003049"
    pic.setAttribute("src", srcData.src)
    pic.setAttribute("class", srcData.id)
    cell.addEventListener("click", reveal)
    cell.appendChild(pic)
    pic.style.display = "none"
    board.appendChild(cell)
    // console.log(cell.getAttribute("class")[0])
  })
}

function clearBoard() {
  while(board.firstChild) {
    board.removeChild(board.firstChild)
  }
}

function reveal(evt) {
  evt.preventDefault()
  if(boardData[evt.target.classList[0]].isPaired || evt.target.classList[1] !== "cell") {
    return
  }
  const square = evt.target
  const squareId = parseInt(square.classList[0])
  if(isMismatched) {
    isMismatched = false
    match = -1
    hide()
  }
  square.firstChild.style.display = "block"
  if(match === -1){
    match = squareId
    return
  }
  if(match === squareId) {
    boardData[square.classList[0]].isPaired = true
    pairCount++
    match = -1
    return
  }
  isMismatched = true
}

function hide() {
  board.childNodes.forEach(child => {
    const square = child.firstChild
    if(!boardData[square.classList[0]].isPaired) {
      child.firstChild.style.display = "none"
    }
  })
}