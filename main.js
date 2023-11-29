const GameModule = (() => {
    const createGame = (rl) => {
        let currentPlayer = 'X';
        const gameBoard = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        const displayGameBoard = () => {
            for (let i = 0; i < 3; i++) {
                console.log(gameBoard[i].join(' | '));
                if (i < 2) {
                    console.log('---------');
                }
            }
        };

        const getSelection = (rl) => {
            rl.question(`Player ${currentPlayer}, enter the number of your column: `, (input) => {
                const number = parseInt(input);
                const [row, col] = findGridPosition(number);
                if (row === 10 || col === 10 || typeof gameBoard[row][col] !== 'number') {
                    console.log('Invalid selection! Enter again.');
                    getSelection(rl); // Restart selection process
                } else {
                    updateGameBoard(row, col, rl);
                }
            });
        };

        const updateGameBoard = (row, col, rl) => {
            updateGameStatus(row, col);
            displayGameBoard();
            if (checkWinner()) {
                updateWinner();
            } else if (isBoardFull()) {
                determineIfGameIsDraw();
            } else {
                changeCurrentPlayer(rl);
            }
        };

        const updateGameStatus = (row, col) => {
            gameBoard[row][col] = currentPlayer;
        };

        const changeCurrentPlayer = (rl) => {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            getSelection(rl);
        };

        const determineIfGameIsDraw = () => {
            console.log('It\'s a draw!');
            displayGameBoard();
            rl.close();
        };

        const isBoardFull = () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (typeof gameBoard[i][j] === 'number') {
                        return false;
                    }
                }
            }
            return true;
        };

        const updateWinner = () => {
            console.log(`Player ${currentPlayer} wins!`);
            displayGameBoard();
            rl.close();
        };

        const checkRowWinner = () => {
            for (let i = 0; i < 3; i++) {
                if (typeof gameBoard[i][0] !== 'number' &&
                    gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
                    return true;
                }
                return false;
            }
        }
        const checkColumnWinner = () => {
            for (let i = 0; i < 3; i++) {
                if (
                    typeof gameBoard[0][i] !== 'number' &&
                    gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]
                ) {
                    return true;
                }
            }
            return false;
        };

        const checkDiagonalWinner = () => {
            if (
                typeof gameBoard[0][0] !== 'number' &&
                gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]
            ) {
                return true;
            }

            if (
                typeof gameBoard[0][2] !== 'number' &&
                gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]
            ) {
                return true;
            }
            return false;
        };

        const checkWinner = () => {
            return checkRowWinner() || checkColumnWinner() || checkDiagonalWinner();
        };

        const findGridPosition = (input) => {
            if (input < 1 || input > 9) {
                return [10, 10]; 
            }
            const row = Math.floor((input - 1) / 3);
            const col = (input - 1) % 3;
        
            return [row, col];

        };

        return { displayGameBoard, getSelection };
    };

    return { createGame };
})();

const UIModule = (() => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const startGame = () => {
        const game = GameModule.createGame(rl);
        game.displayGameBoard();
        game.getSelection(rl);
    };

    return { startGame };
})();

UIModule.startGame();
