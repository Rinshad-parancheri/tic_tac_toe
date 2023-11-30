const GameModule = (() => {
    const createGame = (() => {
        let currentPlayer = 'X';
        let gameBoard = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        const setUpEventListener = () => {
            const uiGameBoard = document.querySelector('.game-board');
            const restartBtn = document.getElementById('restartBtn');


            uiGameBoard.addEventListener('click', gameLogic.getSelection);
            restartBtn.onclick = (e) => gameLogic.restartGame();

        }
``
        const uiMangments = (() => {
            const gameStatusTextBoard = document.getElementById('gameStatusText');
            const overLay = document.getElementById('overlay');
            const overLayContent = document.getElementById('overlayContent');
            const nextMove = document.getElementById('nextMove');
            
            const renderTheGameStatusBoard = () => {
                (gameLogic.checkWinner) ? gameStatusTextBoard.innerText = `${currentPlayer} wins the game` : gameStatusTextBoard.innerText = 'The game is draw'
                overLay.style.display = 'block';
                overLayContent.classList.add('active');
            }

            const updateGameBoardInUi = (e) => {
                e.target.innerText = currentPlayer
            }

            const restartGame = () => {
                overLay.style.display = 'none';
                gameStatusTextBoard.innerText = '';
                overLayContent.classList.remove('active');
                nextMove.innerText = `It's ${currentPlayer} move`;
            }

            const userSelection = () => {
                nextMove.innerText = `It's ${currentPlayer} move`
            }
            const displayInvalidEntry = () => {

                nextMove.innerText = 'invalid move, choose correctly';
            }

            return {
                renderTheGameStatusBoard,
                updateGameBoardInUi,
                restartGame,
                userSelection,
                displayInvalidEntry
            }

        })();

        const gameLogic = (() => {
            const getSelection = (e) => {
                let number = e.target.dataset.row;
                const [row, col] = findGridPosition(number);
                if (row === 10 || col === 10 || typeof gameBoard[row][col] !== 'number') {
                    uiMangments.displayInvalidEntry()
                } else {
                    updateTheGameBoard(row, col, e);
                }
            };

            const updateTheGameBoard = (row, col, e) => {
                gameBoard[row][col] = currentPlayer;
                uiMangments.updateGameBoardInUi(e);
                checkGameStatus();
            };

            const checkGameStatus = () => {
                if (checkWinner()) {
                    uiMangments.renderTheGameStatusBoard()
                } else if (isBoardFull()) {
                    uiMangments.renderTheGameStatusBoard()
                } else {
                    changeCurrentPlayer();
                }
            }

            const restartGame = (e) => {
                gameBoard = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ];
                initializeGameBoard();
                currentPlayer = 'X';
                uiMangments.restartGame();
            }
            const changeCurrentPlayer = () => {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                uiMangments.userSelection()
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


            return {
                getSelection,
                isBoardFull,
                checkWinner,
                restartGame
            };
        })();

        const initializeGameBoard = () => {
            let count = 1;
            const uiGameBoard = document.querySelector('.game-board');
            const nextMoveBoard = document.getElementById('nextMove')
            nextMoveBoard.innerText = `It's ${currentPlayer} move`

            uiGameBoard.innerHTML = '';
            for (let i = 0; i < 3; i++) {

                for (let j = 0; j < 3; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.dataset.row = count;
                    uiGameBoard.appendChild(cell);
                    count++
                }
            }
            setUpEventListener();

        }

        return { initializeGameBoard };
    })();

    return { createGame };
})();

const UIModule = (() => {

    const startGame = () => {
        const game = GameModule.createGame;
        game.initializeGameBoard();
    };

    return { startGame };
})();

UIModule.startGame();