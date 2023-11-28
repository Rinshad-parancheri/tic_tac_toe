const { type } = require('os');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const gmae = function () {
    let currentPlayer = 'X';
    let gameBoard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    function displayGameBoard() {
        for (let i = 0; i < 3; i++) {
            console.log(gameBoard[i].join(' | '));
            if (i < 2) {
                console.log('---------');
            }
        }
    }


    function getSelection() {
        rl.question(`Player ${currentPlayer}, enter the number of your column: `, (input) => {
            const number = parseInt(input);
            const [row, col] = findTheGridPosition(number);
            if (row === 10 || col === 10 || typeof gameBoard[row][col] !== 'number') {
                console.log('Invalid selection! Enter again.');
                getSelection(); // Restart selection process
            } else {
                updateGameBoard(row, col);
            }
        });
    }



    function updateGameBoard(row, col) {
        updateGmaeStatus(row, col);
        displayGameBoard();
        if (checkWinner()) {
            updateWinner();
        } else if (isBoardFull()) {
            determineIfGaemIsDraw();
        } else {
            changeCurrentPlayer();
        }

    }

    function updateGmaeStatus(row, col) {
        gameBoard[row][col] = currentPlayer;

    }

    function changeCurrentPlayer() {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        getSelection();
    }

    function determineIfGaemIsDraw() {

        console.log('It\'s a draw!');
        displayGameBoard();
        rl.close();

    }

    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (typeof gameBoard[i][j] === 'number') {
                    return false;
                }
            }
        }
        return true;
    }



    function throwErrorForWrongSelection(row, col) {
        console.log('invalid selection Enter again: ');
        gameBoard[row][col] = currentPlayer;
    }

    function updateWinner() {
        console.log(`Player ${currentPlayer} wins!`);
        displayGameBoard();
        rl.close();

    }


    function checkRowWinner() {
        for (let i = 0; i < 3; i++) {
            if (
                typeof gameBoard[i][0] !== 'number' &&
                gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]
            ) {
                return true; // Found a winner in row i
            }
        }
        return false;
    }

    function checkColumnWinner() {
        for (let i = 0; i < 3; i++) {
            if (
                typeof gameBoard[0][i] !== 'number' &&
                gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]
            ) {
                return true; // Found a winner in column i
            }
        }
        return false;
    }

    function checkDiagonalWinner() {
        if (
            typeof gameBoard[0][0] !== 'number' &&
            gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]
        ) {
            return true; // Found a winner in diagonal top-left to bottom-right
        }

        if (
            typeof gameBoard[0][2] !== 'number' &&
            gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]
        ) {
            return true; // Found a winner in diagonal top-right to bottom-left
        }
        return false;
    }

    function checkWinner() {
        return checkRowWinner() || checkColumnWinner() || checkDiagonalWinner();
    }


    return {
        displayGameBoard,
        getSelection,
    }


}();

function gameStart() {
    gmae.displayGameBoard();
    gmae.getSelection();

}


function findTheGridPosition(input) {
    switch (input) {
        case 1:
            return [0, 0];
        case 2:
            return [0, 1];
        case 3:
            return [0, 2];
        case 4:
            return [1, 0];
        case 5:
            return [1, 1];
        case 6:
            return [1, 2];
        case 7:
            return [2, 0];
        case 8:
            return [2, 1];
        case 9:
            return [2, 2];

        default:
            return [10, 10];
    }
}


gameStart();