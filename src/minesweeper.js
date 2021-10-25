export default function populateGrid() {

  for (let i = 0; i < 252; i++) {
    makeCell()
  }

  layMines()
  highlightMines()
const grid = document.getElementById("grid")

  grid.addEventListener("click", (e) => {
      console.log(e.target);
      console.log(e.currentTarget);
      console.log("grid clicked");
  })

}

const grid = document.getElementById("grid")

// mkaes 252 identicle cells in the grid
const makeCell = () => {
  const cell = document.createElement("div")
  cell.classList.add("cell")
  grid.appendChild(cell)
}

const totalMines = 40
const minesArray = []

// random number generator between 0 and 251
const getRandomNumber = () => Math.floor(Math.random() * 252)
// randomly selects 40 cells in the grid
const layMines = () => {
  while (minesArray.length < 40) {
    const randomNumber = getRandomNumber()

    if (minesArray.includes(randomNumber) !== true ) {
      minesArray.push(randomNumber)
    }
  }
}

// for visual purposes the cells selected from layMines() are highlighted
const highlightMines = () => {

  const gridCellArray = document.querySelectorAll(".cell")
  minesArray.forEach(element => gridCellArray[element].classList.add("test"))
}

//







populateGrid()
