const board = document.getElementById("board")
const boardData = []
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

function shuffle() {
  while(boardData.length < 16){
    const rand = Math.floor(Math.random() * 8)
    if(pics[rand].instances < 2) {
      boardData.push({
        id: rand,
        src: pics[rand].src
      })
      pics[rand].instances++
    }
  }
}

/* <div class="cell">
  <img src="assets/atlantic_sunset.jpg" alt="atlantic_sunset">
</div> */
function renderBoard() {
  boardData.forEach(srcData => {
    const cell = document.createElement("div")
    const pic = document.createElement("img")
    cell.setAttribute("class", `${srcData.id} cell`)
    pic.setAttribute("src", srcData.src)
    cell.appendChild(pic)
    board.appendChild(cell)
    console.log(cell.getAttribute("class")[0])
  })
}