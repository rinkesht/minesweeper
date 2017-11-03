
export class Board{
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
      this._numberOfRows = numberOfRows;
      this._numberOfColumns = numberOfColumns;
      this._numberOfBombs = numberOfBombs;
      this._numberOfTiles = numberOfRows * numberOfColumns;
      this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
      this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard(){
      return this._playerBoard;
    }
    flipTile(rowIndex, columnIndex){
      if (this._playerBoard[rowIndex][columnIndex] !== " "){
        console.log("The tile has already been flipped");
        return;
      }else if (this._bombBoard[rowIndex][columnIndex] === "B") {
        this._playerBoard[rowIndex][columnIndex] = "B"
        console.log("Oops! mine activated :(");
      }else{
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      return this._numberOfTiles --
    }
    getNumberOfNeighborBombs(rowIndex, columnIndex){
      const neighborOffsets = [
        [-1, -1 ], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      this._numberOfRows = this._bombBoard.length;
      this._numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < this._numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < this._numberOfColumns ){
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === "B"){
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
    hasSafeTiles(){
      return this.numberOfTiles !== this.numberOfBombs;
    }
    printBoard(){
      console.log(this._playerBoard.map(row => row.join(" | ")).join("\n"));
    }
    static generatePlayerBoard(numberOfRows, numberOfColumns){
      let board = []
      for (let i = 0; i < numberOfRows; i++){
        let row = [];
        for (let j = 0; j < numberOfColumns; j++){
          row.push(" ");
        }
        board.push(row);
      }
      return board;
    }
    generateBombBoard(numberOfRows, numberOfColumns){
      let board = []
      for (let i = 0; i < numberOfRows; i++){
        let row = [];
        for (let j = 0; j < numberOfColumns; j++){
          row.push(" ");
        }
        board.push(row);
      }
      let numberOfBombsPlaced = 0;
      //might get 2 or more bombs in the same spot will be fixed later
      while (numberOfBombsPlaced < this._numberOfBombs){
        let randomRowIndex = Math.floor(Math.random() * this._numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * this._numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== "B"){
          board[randomRowIndex][randomColumnIndex] = "B";
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }