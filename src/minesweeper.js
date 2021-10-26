export default function populateGrid() {

  for (let i = 0; i < 252; i++) {
    makeCell(i)
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
    // bombClicked(clickedCell)
  }

}
const gridCellArray = document.querySelectorAll(".cell")
// makes 252 identicle cells in the grid
const makeCell = (i) => {
  const cell = document.createElement("div")
  // const number = document.createTextNode(i)
  // cell.appendChild(number)
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
  let bottomRightCell  = gridWidth * gridHeight -1
  let bottomLeftCell = bottomRightCell - gridWidth + 1
  let topRowArray = topRowCells(gridWidth)
  let leftColumnArray = leftRowCells(gridWidth, bottomLeftCell)
  let rightColumnArray = rightRowCells(gridWidth, bottomRightCell)
  let bottomRowArray = bottomRowCells(gridWidth, bottomRightCell)
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

  findCellType(cellCatorgories, clickedCell, gridWidth)
}

const topRowCells = (gridWidth) => {
  let array = []
  for (let i = 1; i < gridWidth - 1; i++) {
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

const findCellType = (cellCatorgories, clickedCell, gridWidth) => {
let cellType = ""
  if (cellCatorgories.topRow.includes(clickedCell)) {
    cellType = "top row cell"
  } else if (cellCatorgories.leftColumn.includes(clickedCell)) {
    cellType = "left column cell"
  } else if (cellCatorgories.rightColumn.includes(clickedCell)) {
    cellType = "right column cell"
  } else if (cellCatorgories.bottomRow.includes(clickedCell)) {
    cellType = "bottom row cell"
  } else if (cellCatorgories.tl === clickedCell) {
    cellType = "top left cell"
  } else if (cellCatorgories.tr === clickedCell) {
    cellType = "top right cell"
  } else if (cellCatorgories.bl === clickedCell) {
    cellType = "bottom left cell"
  } else if (cellCatorgories.br === clickedCell) {
    cellType = "bottom right cell"
  } else {
    cellType = "middle cell"
  }

  findAdjCells(cellType, clickedCell, gridWidth)
}

// using the sell type, this creates an array of the adjacent cells
function findAdjCells(cellType, clickedCell, gridWidth) {

  const topRowCellCalcArray = [
    clickedCell - 1,
    clickedCell + 1,
    clickedCell + gridWidth - 1,
    clickedCell + gridWidth,
    clickedCell + gridWidth +1
  ]

  const leftColumnCellCalcArray = [
      clickedCell -gridWidth,
      clickedCell - gridWidth +1,
      clickedCell + 1,
      clickedCell + gridWidth,
      clickedCell + gridWidth + 1
  ]

  const rightColumnCellCalcArray = [
      clickedCell - gridWidth -1,
      clickedCell -gridWidth,
      clickedCell - 1,
      clickedCell + gridWidth - 1,
      clickedCell + gridWidth
  ]

  const bottomRowCellCalcArray = [
    clickedCell - gridWidth - 1,
    clickedCell - gridWidth,
    clickedCell - gridWidth +1,
    clickedCell - 1,
    clickedCell + 1
  ]

  const middleCellCalcArray = [
    clickedCell - gridWidth - 1,
    clickedCell - gridWidth,
    clickedCell - gridWidth +1,
    clickedCell - 1,
    clickedCell + 1,
    clickedCell + gridWidth - 1,
    clickedCell + gridWidth,
    clickedCell + gridWidth +1
  ]

  const topLeftCalcArray = [
    clickedCell + 1,
    clickedCell + gridWidth,
    clickedCell + gridWidth +1
  ]

  const topRightCalcArray = [
    clickedCell - 1,
    clickedCell + gridWidth - 1,
    clickedCell + gridWidth
  ]

  const bottomLeftCalcArray = [
    clickedCell - gridWidth,
    clickedCell - gridWidth + 1,
    clickedCell + 1
  ]

  const bottomRightCalcArray = [
    clickedCell - gridWidth - 1,
    clickedCell - gridWidth,
    clickedCell - 1
  ]


  let adjacentCellsArray = []
  if(cellType === "top row cell") {
    adjacentCellsArray = topRowCellCalcArray
  } else if (cellType === "left column cell") {
     adjacentCellsArray = leftColumnCellCalcArray
  } else if (cellType === "right column cell") {
     adjacentCellsArray = rightColumnCellCalcArray
  } else if (cellType === "bottom row cell") {
     adjacentCellsArray = bottomRowCellCalcArray
  } else if (cellType === "middle cell") {
     adjacentCellsArray = middleCellCalcArray
  } else if (cellType === "top left cell") {
     adjacentCellsArray = topLeftCalcArray
  } else if (cellType === "top right cell") {
     adjacentCellsArray = topRightCalcArray
  } else if (cellType === "bottom left cell") {
     adjacentCellsArray = bottomLeftCalcArray
  } else if (cellType === "bottom right cell") {
     adjacentCellsArray = bottomRightCalcArray
  }
  checkForCloseMines(adjacentCellsArray, clickedCell)
}

// This makes a new of array of the adjacent cells that have mines in them
const checkForCloseMines = (adjacentCellsArray, clickedCell) => {
  let closeMineArray = []
  for(let i = 0; i < 9; i++) {
    if(minesArray.includes(adjacentCellsArray[i])) {
      closeMineArray.push(adjacentCellsArray[i])
    }
  }
  countMines(closeMineArray, clickedCell)
}

// This counts the amounts of in the closeMineArray and adds to the DOM (only if the return value of bombClicked is false)
const countMines = (closeMineArray, clickedCell) => {

  if (!bombClicked(clickedCell)) {
    const gridCellArray = document.querySelectorAll(".cell")
    gridCellArray[clickedCell].innerHTML = closeMineArray.length
  } else {
  console.log("Game Over");
  }
}

// checks if a bomb was clicked, returns true if it was
const bombClicked = (clickedCell) => minesArray.includes(clickedCell)









populateGrid()
