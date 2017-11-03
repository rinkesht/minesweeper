"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numOfRows, numOfColumns, numOfBombs) {
        _classCallCheck(this, Game);

        this._board = new Board(numOfRows, numOfColumns, numOfBombs);
    }

    _createClass(Game, [{
        key: "playMove",
        value: function playMove(rowIndex, columnIndex) {
            if (rowIndex >= 0 && rowIndex < this._board._playerBoard.length && columnIndex >= 0 && columnIndex < this._board._playerBoard[0].length) {
                this._board.flipTile(rowIndex, columnIndex);
                if (this._board._playerBoard[rowIndex][columnIndex] === 'B') {
                    // Bomb!
                    this._board.printBoard("Game Over!");
                } else if (!this._board.hasSafeTile) {
                    // Safe Tile
                    this._board.printBoard("You Win!");
                } else {
                    // Continue
                    this._board.printBoard("Current Board:");
                }
            } else {
                this._board.printBoard("Invalid Move! Current Board:");
            }
        }
    }]);

    return Game;
}();

var Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: "flipTile",
        value: function flipTile(rowIndex, columnIndex) {
            if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
                console.log('This tile has already been flipped!');
                return;
            } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            }
            this._numberOfTiles--;
        }
    }, {
        key: "getNumberOfNeighborBombs",
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            var numberOfBombs = 0;

            neighborOffsets.forEach(function (offset) {
                var neighborRowIndex = rowIndex + offset[0];
                var neighborColumnIndex = columnIndex + offset[1];
                if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                    if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === "B") {
                        numberOfBombs++;
                    }
                }
            });
            return numberOfBombs;
        }
    }, {
        key: "hasSafeTile",
        value: function hasSafeTile() {
            return this._numOfTiles === this._numOfBombs;
        }
    }, {
        key: "printBoard",
        value: function printBoard(boardTitle) {
            console.log(boardTitle + '\n' + this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
    }, {
        key: "generatePlayerBoard",
        value: function generatePlayerBoard(numberOfRows, numberofColumns) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                board.push([]);
                for (var j = 0; j < numberofColumns; j++) {
                    board[i].push(' ');
                }
            }

            return board;
        }
    }, {
        key: "generateBombBoard",
        value: function generateBombBoard(numberOfRows, numberOfColumns) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                board.push([]);
                for (var j = 0; j < numberOfColumns; j++) {
                    board[i].push(null);
                }
            }
            // Set Bombs onto Board
            var numberOfBombsPlaced = 0;
            while (numberOfBombsPlaced < this._numOfBombs) {
                var randomRowIndex = Math.floor(Math.random() * numberOfRows);
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
                // Check if a bomb is already set
                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                    board[randomRowIndex][randomColumnIndex] = 'B';
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
    }]);

    return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(0, 0);
g.playMove(2, 1);
g.playMove(1, 2);
g.playMove(2, 2);
g.playMove(1, 1);
g.playMove(1, 0);