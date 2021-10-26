export default function populateGrid() {

  for (let i = 0; i < 252; i++) {
    makeCell()
  }

  layMines()
  highlightMines()

// returns the index value of the clicked cell in the gridCellArray
  const gridCellArray = document.querySelectorAll(".cell")
  gridCellArray.forEach(check => {
    check.addEventListener('click', checkIndex)
  })
  function checkIndex(event){
    // console.log(Array.from(gridCellArray).indexOf(event.target));
    const clickedCell = Array.from(gridCellArray).indexOf(event.target);
    adjacentCells(clickedCell)
  }


}
const gridCellArray = document.querySelectorAll(".cell")
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

// takes an input of the clicked cell, then using the current grid set up it catorgorises each cell depending on its location and put each catorgory type in an object with an array of all it's cells. The findAdjCells() function then gets called and identifies what cell category the clicked cell is in.
const adjacentCells = (clickedCell) => {
  let gridWidth = 18
  let gridHeight = 14
  let topLeftCell = 0
  let topRightCell = topLeftCell + gridWidth - 1
  // console.log( topRightCell )
  let bottomRightCell  = gridWidth * gridHeight -1
  // console.log(bottomRightCell)
  let bottomLeftCell = bottomRightCell - gridWidth + 1
  // console.log(bottomLeftCell)
  let topRowArray = topRowCells(gridWidth)
  // console.log(topRowArray);
  // topRowAdjCells()
  let leftColumnArray = leftRowCells(gridWidth, bottomLeftCell)
  // console.log(leftColumnArray);
  let rightColumnArray = rightRowCells(gridWidth, bottomRightCell)
  // console.log(rightColumnArray);
  let bottomRowArray = bottomRowCells(gridWidth, bottomRightCell)
  // console.log(bottomRowArray);
  const gridCellArray = document.querySelectorAll(".cell")

  const cellCatorgories = {
    tl: topLeftCell,
    tr: topRightCell,
    bl: bottomLeftCell,
    br: bottomRightCell,
    topRow: topRowArray,
    bottomRow: bottomRowArray,
    leftColumn: leftColumnArray,
    rightColumn: rightColumnArray
  }

  findAdjCells(cellCatorgories, clickedCell)

  console.log(cellCatorgories);

}

const findAdjCells = (cellCatorgories, clickedCell) => {
  console.log(clickedCell);
}

const topRowCells = (gridWidth) => {
  let array = []
  for (let i = 1; i < gridWidth; i++) {
    array.push(i)
  }
  return array
}

const bottomRowCells = (gridWidth, bottomRightCell) => {
  let array = []
  for (let i = bottomRightCell - gridWidth + 2; i < bottomRightCell  ; i++) {
    array.push(i)
  }
  return array
}

const leftRowCells = (gridWidth, bottomLeftCell) => {
  let array =[]
  for (let i = gridWidth; i < bottomLeftCell; i += gridWidth) {
    array.push(i)
  }
  return array
}

const rightRowCells = (gridWidth, bottomRightCell) => {
  let array =[]
  for (let i = (gridWidth * 2) - 1; i < bottomRightCell; i += gridWidth) {
    array.push(i)
  }
  return array
}





populateGrid()
