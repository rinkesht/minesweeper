"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: "flipTile",
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== " ") {
        console.log("The tile has already been flipped");
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === "B") {
        this._playerBoard[rowIndex][columnIndex] = "B";
        console.log("Oops you've blown up");
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      return this._numberOfTiles--;
    }
  }, {
    key: "getNumberOfNeighborBombs",
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      this._numberOfRows = this._bombBoard.length;
      this._numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < _this._numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < _this._numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === "B") {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: "hasSafeTiles",
    value: function hasSafeTiles() {
      return this.numberOfTiles !== this.numberOfBombs;
    }
  }, {
    key: "printBoard",
    value: function printBoard() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(" | ");
      }).join("\n"));
    }
  }, {
    key: "generateBombBoard",
    value: function generateBombBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(" ");
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      //might get 2 or more bombs in the same spot will be fixed later
      while (numberOfBombsPlaced < this._numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * this._numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * this._numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== "B") {
          board[randomRowIndex][randomColumnIndex] = "B";
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }, {
    key: "playerBoard",
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: "generatePlayerBoard",
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(" ");
        }
        board.push(row);
      }
      return board;
    }
  }]);

  return Board;
}();