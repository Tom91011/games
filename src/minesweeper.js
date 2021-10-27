export default function populateGrid() {

  for (let i = 0; i < 252; i++) {
    makeCell(i)
  }

  layMines()
  highlightMines()

// returns the index value of the clicked cell in the gridCellArray
  let clickedCell = ""
  const gridCellArray = document.querySelectorAll(".cell")
  gridCellArray.forEach(check => {
    check.addEventListener('click', checkIndex)
  })
  function checkIndex(event) {
    clickedCell = Array.from(gridCellArray).indexOf(event.target);

    startProcess()
  }

   const startProcess = async () => {
     const operationA = await getCellCategories()
     const operationB = await findCellType(operationA, clickedCell)
     const operationC = await findAdjCells(operationB, clickedCell)
     const operationD = await checkForNeighbouringMines(operationC)
     const operationE = await countMines(operationD, clickedCell, operationC)
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

let gridWidth = 18
const totalMines = 40
const minesArray = []
let knownZeroes = {
    array:[],
    changed: false
}

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

// takes an input of the clicked cell, then using the current grid set up it categorises each cell depending on its location and put each category type in an object with an array of all it's cells. The findAdjCells() function then gets called and identifies what cell category the clicked cell is in.
const getCellCategories = () => {

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
   return(cellCatorgories)
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

const findCellType = (cellCatorgories, cell) => {
let cellType = ""
  if (cellCatorgories.topRow.includes(cell)) {
    cellType = "top row cell"
  } else if (cellCatorgories.leftColumn.includes(cell)) {
    cellType = "left column cell"
  } else if (cellCatorgories.rightColumn.includes(cell)) {
    cellType = "right column cell"
  } else if (cellCatorgories.bottomRow.includes(cell)) {
    cellType = "bottom row cell"
  } else if (cellCatorgories.tl === cell) {
    cellType = "top left cell"
  } else if (cellCatorgories.tr === cell) {
    cellType = "top right cell"
  } else if (cellCatorgories.bl === cell) {
    cellType = "bottom left cell"
  } else if (cellCatorgories.br === cell) {
    cellType = "bottom right cell"
  } else {
    cellType = "middle cell"
  }
  // console.log(cellType);

  return(cellType)
}

// using the cell type, this creates an array of the adjacent cells
function findAdjCells(cellType, cell) {

  const topRowCellCalcArray = [
    cell - 1,
    cell + 1,
    cell + gridWidth - 1,
    cell + gridWidth,
    cell + gridWidth + 1
  ]

  const leftColumnCellCalcArray = [
      cell - gridWidth,
      cell - gridWidth + 1,
      cell + 1,
      cell + gridWidth,
      cell + gridWidth + 1
  ]

  const rightColumnCellCalcArray = [
      cell - gridWidth - 1,
      cell - gridWidth,
      cell - 1,
      cell + gridWidth - 1,
      cell + gridWidth
  ]

  const bottomRowCellCalcArray = [
    cell - gridWidth - 1,
    cell - gridWidth,
    cell - gridWidth + 1,
    cell - 1,
    cell + 1
  ]

  const middleCellCalcArray = [
    cell - gridWidth - 1,
    cell - gridWidth,
    cell - gridWidth + 1,
    cell - 1,
    cell + 1,
    cell + gridWidth - 1,
    cell + gridWidth,
    cell + gridWidth + 1
  ]

  const topLeftCalcArray = [
    cell + 1,
    cell + gridWidth,
    cell + gridWidth + 1
  ]

  const topRightCalcArray = [
    cell - 1,
    cell + gridWidth - 1,
    cell + gridWidth
  ]

  const bottomLeftCalcArray = [
    cell - gridWidth,
    cell - gridWidth + 1,
    cell + 1
  ]

  const bottomRightCalcArray = [
    cell - gridWidth - 1,
    cell - gridWidth,
    cell - 1
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
  return(adjacentCellsArray)

}

// This makes a new of array of the adjacent cells that have mines in them
const checkForNeighbouringMines = (array) => {
  let closeMineArray = []
  for(let i = 0; i < 9; i++) {
    if(minesArray.includes(array[i])) {
      closeMineArray.push(array[i])
    }
  }

  return(closeMineArray)

  }

// This counts the amounts of bombs in the closeMineArray and adds to the DOM (only if the return value of bombClicked is true, or if a zeroClicked returns true)
const countMines = (closeMineArray, cell, array) => {

  const gridCellArray = document.querySelectorAll(".cell")

  if (bombClicked(cell)) {
      console.log("Game Over");
  } else if (zeroCheck(closeMineArray)) {
      gridCellArray[cell].classList.add("no-mines")
      if(!knownZeroes.array.includes(cell)){knownZeroes.array.push(cell)}
      console.log("no mines close");
      checkForNeighbouringZerosIteration(array)
  } else {
      gridCellArray[cell].innerHTML = closeMineArray.length
  }
}

// checks if a bomb was clicked, returns true if it was
const bombClicked = (cell) => minesArray.includes(cell)

// checks if there are any near mines, if there aren't then it returns true
const zeroCheck = (closeMineArray) => closeMineArray.length === 0

const checkForNeighbouringZerosIteration = (array) => {
  let initialZeroArrayLength = knownZeroes.array.length
  // console.log(initialZeroArrayLength);
  console.log("t " + array);
  array.forEach(checkForNeighbouringZero)
  haveZeroesBeenAdded(initialZeroArrayLength)
  // if(haveZeroesBeenAdded(initialZeroArrayLength)) {
  //   console.log("Zeroes have been added");
  //   // console.log(knownZeroes.array);
  //   // console.log(initialZeroArrayLength);
  //   knownZeroes.array.forEach(checkForNeighbouringZero)
  // } else {
  //   console.log("No More Mines detected");
  // }
  // checkMoreZeroes(initialZeroArrayLength)

}

const checkForNeighbouringZero = (item, initialZeroArrayLength) => {
 // console.log(item);
  // let initialZeroArrayLength = knownZeroes.array.length
  // console.log(initialZeroArrayLength);
  const gridCellArray = document.querySelectorAll(".cell")
  const operationA = findCellType(getCellCategories(), item)
  const operationB = findAdjCells(operationA, item)
  const operationC = checkForNeighbouringMines(operationB)
   if (operationC.length === 0) {
     if(!knownZeroes.array.includes(item)) {
     knownZeroes.array.push(item)
     gridCellArray[item].classList.add("adj-zero")
     // console.log(initialZeroArrayLength);
     // console.log(knownZeroes.array.length);
     // console.log("z " + knownZeroes.array);
   }}
   // haveZeroesBeenAdded(initialZeroArrayLength)
 // console.log(knownZeroes.array);
}


const haveZeroesBeenAdded = (initialZeroArrayLength) => {
    console.log("a " + knownZeroes.array);
    console.log("b " + initialZeroArrayLength);
    console.log("c " + knownZeroes.array.length);
  if(initialZeroArrayLength !== knownZeroes.array.length) {
    console.log("zeroes have been added");
    knownZeroes.array.forEach(checkMoreZeroes)
    // checkForNeighbouringZerosIteration(knownZeroes.array)
  }
  console.log("d " + knownZeroes.array);
}

const checkMoreZeroes = (item, initialZeroArrayLength) => {
  console.log("g " + item);
  // console.log("This is called");
  const gridCellArray = document.querySelectorAll(".cell")
  const operationA = findCellType(getCellCategories(), item)
  console.log("op A " + operationA);
  const operationB = findAdjCells(operationA, item)
  console.log("op b " + operationB);
  const operationC = arrayToCheckForZeroes(operationB)
  console.log("op C " + operationC);
   // if (operationC.length === 0) {
   //   if(!knownZeroes.array.includes(item)) {
   //   knownZeroes.array.push(item)
   //   gridCellArray[item].classList.add("adj-zero")
   //   // console.log(initialZeroArrayLength);
   //   // console.log(knownZeroes.array.length);
   //   console.log("x " + knownZeroes.array);
   // }}

   // return (arrayToCheckForZeroes)
}

const arrayToCheckForZeroes = (array) => {
 console.log(array);
 // checkMoreZeroes
  checkForNeighbouringZerosIteration(array)
}


populateGrid()
