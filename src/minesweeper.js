class Game {
    constructor(numOfRows, numOfColumns, numOfBombs) {
        this._board = new Board(numOfRows, numOfColumns, numOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        if((rowIndex >= 0) && (rowIndex < this._board._playerBoard.length) && (columnIndex >= 0) && (columnIndex < this._board._playerBoard[0].length)) {
            this._board.flipTile(rowIndex, columnIndex);
            if(this._board._playerBoard[rowIndex][columnIndex] === 'B') { // Bomb!
                this._board.printBoard("Game Over!");
            } else if(!this._board.hasSafeTile) { // Safe Tile
                this._board.printBoard("You Win!");
            } else { // Continue
                this._board.printBoard("Current Board:");
            }
        } else {
            this._board.printBoard("Invalid Move! Current Board:");
        }
    }
}



class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs
        this._numberOfTiles = (numberOfRows * numberOfColumns)
        this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns)
        this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
    };

    get playerBoard() {
        return this._playerBoard
    };

    
    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped!');
            return;
        }
        else if(this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B'
        }
        else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles--;
    }
        
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];
        const numberOfRows = this._bombBoard.length
        const numberOfColumns = this._bombBoard[0].length
        let numberOfBombs = 0

        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ){
            if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === "B"){
                numberOfBombs++;
            }
            }
        });
        return numberOfBombs;
    }

    hasSafeTile() {
        return (this._numOfTiles === this._numOfBombs);
    }

    printBoard(boardTitle) {
         console.log(boardTitle+'\n'+this._playerBoard.map((row) => row.join(' | ')).join('\n'));
    }

    generatePlayerBoard(numberOfRows, numberofColumns) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            board.push([]);
            for(let j = 0; j < numberofColumns; j++) {
                board[i].push(' ');
            }
        }

        return board;
    }

    generateBombBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            board.push([]);
            for(let j = 0; j < numberOfColumns; j++) {
                board[i].push(null);
            }
        }
        // Set Bombs onto Board
        let numberOfBombsPlaced = 0;
        while(numberOfBombsPlaced < this._numOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            // Check if a bomb is already set
            if(board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }

}

const g = new Game(3, 3, 3);
g.playMove(0,0)
g.playMove(2,1)
g.playMove(1,2)
g.playMove(2,2)
g.playMove(1,1)
g.playMove(1,0)