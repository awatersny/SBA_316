//// TODO Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 

const board = document.getElementById("board")
const info = document.querySelector("#info-container")
const form = document.querySelector("form")
const msgEl = document.getElementById("msg")
const boardData = []
let match = -1
let isMismatched = false
let username = ""
let pairCount = 0

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
  if(userVal.length > 20) {
    alert("Your username is too long!  Please keep it under 20 characters.")
    evt.target.childNodes[1].value = ""
    return
  }
  username = userVal
  form.style.display = "none"
  renderMsg(`Hello ${username}.  Match the images.`)
  shuffle()
  renderBoard()
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
  pics.forEach(pic => {
    pic.instances = 0
  })
}

function createCell(id, src) {
  const cell = document.createElement("div")
  const pic = document.createElement("img")
  cell.setAttribute("class", `${id} cell`)
  cell.style.backgroundColor = "#003049"
  pic.setAttribute("src", src)
  pic.setAttribute("class", id)
  cell.addEventListener("click", reveal)
  cell.appendChild(pic)
  pic.style.display = "none"
  board.appendChild(cell)
}

function renderBoard() {
  board.style.display = "flex"
  boardData.forEach(srcData => {
    createCell(srcData.id, srcData.src)
  })
}

function clearBoard() {
  while(board.firstChild) {
    board.removeChild(board.firstChild)
  }
  while(boardData.length > 0) {
    boardData.pop(boardData[boardData.length - 1])
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
    renderMsg("Match the images.")
    match = squareId
    return
  }
  if(match === squareId) {
    boardData[square.classList[0]].isPaired = true
    pairCount++
    match = -1
    if(pairCount === 8) {
      renderMsg(`Congratulations ${username}!  You've matched them all!`)
      setTimeout(() => {
        msgEl.addEventListener("click", reset)
        renderMsg("Click here to restart.")
      }, 1500);
    } else {
      renderMsg(`Good job, ${username}!  You found a pair`)
    }
    return
  }
  renderMsg("Those two don't match.  Try again.")
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

function renderMsg(msg) {
  msgEl.style.display = "flex"
  msgEl.innerHTML = `<h2><pre>${msg}</pre></h2>`
}

function reset(evt) {
  evt.preventDefault()
  msgEl.removeEventListener("click", reset)
    msgEl.style.border = "10px inset #003049"
  setTimeout(() => {
    msgEl.style.border = "10px outset #003049"
    clearBoard()
    username = ""
    pairCount = 0
    board.style.display = "none"
    msgEl.style.display = "none"
    form.style.display = "flex"
    form.addEventListener("submit", play)
  }, 300);
}