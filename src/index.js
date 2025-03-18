const board = document.getElementById("board")
const info = document.querySelector("#info-container")
const boardData = []
let match = -1
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

shuffle()
renderBoard()
// clearBoard()

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
  const square = evt.target
  const squareId = parseInt(square.classList[0])
  if(boardData[square.classList[0]].isPaired || !square.firstChild) {
    return
  }
  console.log(match, squareId)
  if(match === -1){
    if(square.classList[1] === "cell") {
      square.firstChild.style.display = "block"
      match = squareId
      return
    }
  }
  if(match === squareId) {
    boardData[square.classList[0]].isPaired = true
    square.firstChild.style.display = "block"
    pairCount++
    console.log(pairCount)
    match = -1
    return
  }
  match = -1
  hide()
}

function hide() {
  board.childNodes.forEach(child => {
    const square = child.firstChild
    if(!boardData[square.classList[0]].isPaired) {
      child.firstChild.style.display = "none"
    }
  })
}