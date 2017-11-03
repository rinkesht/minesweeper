// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the dist directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
        console.log(this._board._bombBoard)
    }

    playMove(rowIndex, columnIndex){
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === "B"){
          return "Game Over!", this._board.printBoard();
        }else if (this._board.hasSafeTiles()){
          return "Looks like you have won. Congratulations!!";
        }else{
          return "Current Board: " + this._board.printBoard()
        }
      }
}