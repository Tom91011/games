
export default function populateGrid() {

  const difficultyEl = document.getElementById("selected-difficulty")
  const optionsEl = document.getElementById("options")
  const diffultyOptionsEl = document.querySelectorAll("difficulty-option")
  const gridEl = document.getElementById("grid")
  const gridContainerEl = document.getElementById("game-container-inner")
  const gameOverEl = document.getElementById("game-over")
  const startAgainEl = document.getElementById("start-again")

  difficultyEl.addEventListener("click", function(e) {
    optionsEl.classList.toggle("hidden")
  })
  optionsEl.addEventListener("click", function(e)  {
    difficultyEl.textContent = e.target.textContent;
    optionsEl.classList.toggle("hidden")
    gridEl.innerHTML = ""
    makeGrid(difficultyEl.textContent, gridContainerEl)
    resetGame()
  })
  startAgainEl.addEventListener("click", function(e) {
      gameOverEl.classList.toggle("hidden")
      gridEl.innerHTML = ""
      makeGrid(difficultyEl.textContent, gridContainerEl)
      resetGame()
  })
makeGrid(difficultyEl.textContent, gridContainerEl)
// returns the index value of the clicked cell in the gridCellArray

  const resetGame = () => {
    let clickedCell = ""
    let bombCell = ""
    const gridCellArray = document.querySelectorAll(".cell")

    gridCellArray.forEach(check => {
      check.addEventListener('click', checkIndex)
      check.addEventListener('contextmenu', clickBomb)
    })
    function checkIndex(event) {
          clickedCell = Array.from(gridCellArray).indexOf(event.target);
          layMines(findCellType(getCellCategories(), clickedCell), clickedCell)
          highlightMines()
          updateMinesHeading()
          startGame()
    }
    function clickBomb(event) {
      if (event.target.classList.contains("cell")) //if a bomb is flagged then this targets the parent instead of the icon to unflag a bomb
          bombCell = Array.from(gridCellArray).indexOf(event.target);
          const cellStatus = setCellStatus(bombCell)
          highlightBomb(bombCell, cellStatus)
          hasWon()
    }

   const startGame = async () => {
     setCellStatus(clickedCell)
     const cellCategories = await getCellCategories()
     const cellType = await findCellType(cellCategories, clickedCell)
     const adjCells = await findAdjCells(cellType, clickedCell)
     const adjMines = await checkForNeighbouringMines(adjCells)
     const mines = await countMines(adjMines, clickedCell, adjCells)
     // const hasWon = await hasWon(clickedCell);
   }

   const highlightBomb = (bombCell, cellStatus) => {
     if (cellStatus === "zero" || cellStatus === "number") {
       } else if (gridCellArray[bombCell].innerHTML === '<i class="fas fa-bomb" <="" i="" aria-hidden="true"></i>') {
            gridCellArray[bombCell].innerHTML = ''
            gridCellArray[bombCell].classList.toggle("bomb")
       } else {
            gridCellArray[bombCell].classList.toggle("bomb")
            gridCellArray[bombCell].innerHTML = '<i class="fas fa-bomb"</i>'
            }
     updateMinesHeading()
   }

   const updateMinesHeading = () => {
     const mineCellArray = document.querySelectorAll(".bomb")
     const minesToFoundEl = document.getElementById("bombs-to-find")
     minesToFoundEl.innerHTML = (totalMines-mineCellArray.length)
    }
  }
  resetGame()
}

const gridCellArray = document.querySelectorAll(".cell")
const gameOverEl = document.getElementById("game-over")
const youWonMessageEl = document.getElementById("won")
const youLoseMessageEl = document.getElementById("lose")

const gridTypes = [{
    difficulty:"Easy",
    width:12,
    height:10,
    mines:15
  },
  {
    difficulty:"Medium",
    width: 18,
    height: 14,
    mines: 40
  },
  {
    difficulty:"Hard",
    width:24,
    height:20,
    mines: 99
  }
]

let gridWidth = ""
let gridHeight = ""
let gridCells = ""
let totalMines = ""
let minesArray = []
let knownZeroes = []
let numberStatusList = []

const setCellStatus = (cell) => {
    if (numberStatusList[cell].type === "number" || numberStatusList[cell].type === "zero") {
        numberStatusList[cell].isClicked = true
    } else {
        numberStatusList[cell].isClicked = !numberStatusList[cell].isClicked
  }
  return numberStatusList[cell].type
}

const makeGrid = (currentDifficulty, gridContainerEl) => {
  minesArray = []
  knownZeroes = []

  if(currentDifficulty === gridTypes[0].difficulty) {
    gridWidth = gridTypes[0].width
    gridHeight = gridTypes[0].height
    gridContainerEl.className = ""
    gridContainerEl.classList.add("small")
    gridCells = gridTypes[0].width * gridTypes[0].height
    totalMines = gridTypes[0].mines
  } else if (currentDifficulty === gridTypes[1].difficulty) {
      gridWidth = gridTypes[1].width
      gridHeight = gridTypes[1].height
      gridContainerEl.className = ""
      gridContainerEl.classList.add("medium")
      gridCells = gridTypes[1].width * gridTypes[1].height
      totalMines = gridTypes[1].mines
  } else {
      gridWidth = gridTypes[2].width
      gridHeight = gridTypes[2].height
      gridContainerEl.className = ""
      gridContainerEl.classList.add("large")
      gridCells = gridTypes[2].width * gridTypes[2].height
      totalMines = gridTypes[2].mines
  }
  makeCell(gridCells)
}

const makeCell = (gridCells) => {
  numberStatusList = []
  minesArray = []
  knownZeroes = []
  for (let i = 0; i < gridCells; i++) {
    const cell = document.createElement("div")
    // const number = document.createTextNode(i)
    // cell.appendChild(number)
    cell.classList.add("cell")
    if ( Math.floor(i / gridWidth)%2  && i%2 == 0 ) {
      cell.classList.add("light-cell")
    } else if ( Math.floor(i / gridWidth)%2  || i%2 == 0 ) {
      cell.classList.add("dark-cell")
    } else {  cell.classList.add("light-cell") }
    grid.appendChild(cell)
    numberStatusList.push({
      number: i,
      type: "",
      checked:"false",
      isClicked: false
    })
  }
}

// random number generator between 0 and 251
const getRandomNumber = () => Math.floor(Math.random() * gridCells)
// randomly selects 40 cells in the grid
const layMines = (cellType, clickedCell) => {

  const adjCells = findAdjCells(cellType, clickedCell)
  while (minesArray.length < totalMines) {
    const randomNumber = getRandomNumber()
    if (
        minesArray.includes(randomNumber) !== true
        && randomNumber !== clickedCell
        && adjCells.includes(randomNumber) !== true
       ) {
      minesArray.push(randomNumber)
    }
  }
}

// for visual purposes the cells selected from layMines() are highlighted
const highlightMines = () => {
  const gridCellArray = document.querySelectorAll(".cell")
  minesArray.forEach(element => {
    classifyCell(element, "mine")
  })
}

const classifyCell = (element, mine) => {
  numberStatusList[element].type = mine
  numberStatusList[element].checked = true
  if (numberStatusList[element].type !== "mine") {
    setCellStatus(element)
  }
}

// takes an input of the clicked cell, then using the current grid set up it categorises each cell depending on its location and put each category type in an object with an array of all it's cells. The findAdjCells() function then gets called and identifies what cell category the clicked cell is in.
const getCellCategories = () => {
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

  return(hasCellBeenChecked(adjacentCellsArray))
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
     gameOverEl.classList.remove("hidden")
     youLoseMessageEl.classList.remove("hidden")
     youWonMessageEl.classList.add("hidden")
     revealMines()
  } else if (zeroCheck(closeMineArray)) {

            if ( Math.floor(cell / gridWidth)%2  && cell%2 == 0 ) {
              gridCellArray[cell].classList.add("safe-light")
            } else if ( Math.floor(cell / gridWidth)%2  || cell%2 == 0 ) {
              gridCellArray[cell].classList.add("safe-dark")
            } else {  gridCellArray[cell].classList.add("safe-light") }



      if(!knownZeroes.includes(cell)){
        knownZeroes.push(cell)
      }
      checkForNeighbouringZerosIteration(array)
      classifyCell(cell, "zero")
      hasWon()
  } else {
      gridCellArray[cell].innerHTML = closeMineArray.length

      if ( Math.floor(cell / gridWidth)%2  && cell%2 == 0 ) {
        gridCellArray[cell].classList.add("safe-light")
      } else if ( Math.floor(cell / gridWidth)%2  || cell%2 == 0 ) {
        gridCellArray[cell].classList.add("safe-dark")
      } else {  gridCellArray[cell].classList.add("safe-light") }

      classifyCell(cell, "number")
      hasWon()
  }
}

const revealMines = () => {
  const gridCellArray = document.querySelectorAll(".cell")
  minesArray.forEach((element, i) => {
    setTimeout(() => {
      console.log(gridCellArray[element]);
      gridCellArray[element].classList.add("bomb-explode")
      gridCellArray[element].innerHTML = '<i class="fas fa-bomb" <="" i="" aria-hidden="true"></i>'
    }, i * 20)
        })

}

// checks if a bomb was clicked, returns true if it was
const bombClicked = (cell) => minesArray.includes(cell)

// checks if there are any near mines, if there aren't then it returns true
const zeroCheck = (closeMineArray) => closeMineArray.length === 0

// Checks if a cell has already been checked for adjacent mines
const hasCellBeenChecked = (array) => {
  let newArray = []
  array.forEach((item) => {
    if(numberStatusList[item].checked) {
      newArray.push(item)
    }
  })
  return newArray
}


// Goes through each mine in an array and checks if its adjacent cells have any neighbouring mines, if they don't have adjacent bombs then investigate these new cells to see if these cells have any adjacent mines/zeroes. This process keeps going until the array doesn't get any bigger. Once the array doesn't get any bigger then all cells have been checked and either they have adjacent bombs or they don't.
const checkForNeighbouringZerosIteration = (array) => {
  let initialZeroArrayLength = knownZeroes.length
  array.forEach(checkForNeighbouringZero)
  haveZeroesBeenAdded(initialZeroArrayLength)
}

const haveZeroesBeenAdded = (initialZeroArrayLength) => {
  if(initialZeroArrayLength !== knownZeroes.length) {
    knownZeroes.forEach(checkMoreZeroes)
  }
}

const checkMoreZeroes = (item, initialZeroArrayLength) => {
  const gridCellArray = document.querySelectorAll(".cell")
  const cellType = findCellType(getCellCategories(), item)
  const adjCellsArray = findAdjCells(cellType, item)
  const startIterationOfArray = checkForNeighbouringZerosIteration(adjCellsArray)
}

const alternateCellColour = (cell, array) => {
  if ( Math.floor(cell / gridWidth)%2  && cell%2 == 0 ) {
    array[cell].classList.add("safe-light")
  } else if ( Math.floor(cell / gridWidth)%2  || cell%2 == 0 ) {
    array[cell].classList.add("safe-dark")
  } else {  array[cell].classList.add("safe-light") }
}

const checkForNeighbouringZero = (item, initialZeroArrayLength) => {
  const gridCellArray = document.querySelectorAll(".cell")
  const cellType = findCellType(getCellCategories(), item)
  const adjCellsArray = findAdjCells(cellType, item)
  const neighbouringMinesArray = checkForNeighbouringMines(adjCellsArray)
   if (neighbouringMinesArray.length === 0) {
     if(!knownZeroes.includes(item)) {
     knownZeroes.push(item)

     alternateCellColour(item, gridCellArray)
     classifyCell(item, "zero")
   }} else {
         gridCellArray[item].innerHTML = neighbouringMinesArray.length

         alternateCellColour(item, gridCellArray)
         classifyCell(item, "number")
     }
}

const hasWon = () => {
   let allChecked = 0
   let correctMines = 0
   numberStatusList.forEach((element) => {
     if (element.isClicked === true) {
       allChecked +=1
     } if (allChecked === gridCells) {
       minesArray.forEach(element => {
         if(numberStatusList[element].type === "mine") {
           correctMines += 1
         }
       })
     }
   })
  if (correctMines === minesArray.length) {
       gameOverEl.classList.remove("hidden")
       youWonMessageEl.classList.remove("hidden")
       youLoseMessageEl.classList.add("hidden")
  }
}


populateGrid()
