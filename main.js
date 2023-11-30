const GameModule = (() => {
    const createGame = () => {
        let currentPlayer = 'X';
        const uiGameBoard = document.querySelector('.game-board');

        // Create the Tic Tac Toe grid cells
        const getSelection = (e) => {
            let number = e.target.getAttribute('data-row');
            const [row, col] = findGridPosition(number);
            if (row === 10 || col === 10 || typeof gameBoard[row][col] !== 'number') {
                console.log('Invalid selection! Enter again.');
                getSelection(e); // Restart selection process
            } else {
                updateGameBoard(row, col,e);
            }

        };

        function renderGameBoardInUi() {
            let count = 1;
            for (let i = 0; i < 3; i++) {

                for (let j = 0; j < 3; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    // Set unique identifiers for each cell if needed
                    cell.dataset.row = count;
                    cell.addEventListener('click', getSelection)
                    uiGameBoard.appendChild(cell);
                    count++
                }
            }

        }

        const gameBoard = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];


        const updateGameBoard = (row, col, e) => {
            updateGameStatus(row, col, e);
            
            if (checkWinner()) {
                updateWinner();
            } else if (isBoardFull()) {
                determineIfGameIsDraw();
            } else {
                changeCurrentPlayer();
            }
        };

        const updateGameStatus = (row, col,e) => {
            gameBoard[row][col] = currentPlayer;
            updateGameBoardInUi(e);
        };
         const updateGameBoardInUi = (e) => {
            e.target.innerText = currentPlayer
         }
        const changeCurrentPlayer = () => {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        };

        const determineIfGameIsDraw = () => {
            console.log('It\'s a draw!');
    
            
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

        return { renderGameBoardInUi, getSelection };
    };

    return { createGame };
})();

const UIModule = (() => {

    const startGame = () => {
        const game = GameModule.createGame();
        game.renderGameBoardInUi()
        // game.getSelection();
    };

    return { startGame };
})();

UIModule.startGame();