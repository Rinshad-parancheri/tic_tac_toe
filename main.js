const GameModule = (() => {
    const createGame = (() => {
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let winner = false;
        const setUpEventListener = () => {
            const uiGameBoard = document.querySelector('.game-board');
            const restartBtn = document.getElementById('restartBtn');

            uiGameBoard.addEventListener('click', gameLogic.getSelection);
            restartBtn.onclick = (e) => gameLogic.restartGame();

        }

        const uiMangments = (() => {
            const gameStatusTextBoard = document.getElementById('gameStatusText');
            const overLay = document.getElementById('overlay');
            const overLayContent = document.getElementById('overlayContent');
            const nextMove = document.getElementById('nextMove');

            const renderTheGameStatusBoard = () => {
                (!winner) ? gameStatusTextBoard.innerText = 'The game is draw' : gameStatusTextBoard.innerText = `${currentPlayer} wins the game`;
                overLay.style.display = 'block';
                overLayContent.classList.add('active');
            }

            const renderGameBoard = (e) => {
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
                renderGameBoard,
                restartGame,
                userSelection,
                displayInvalidEntry
            }

        })();

        const gameLogic = (() => {
            const winningCombination = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ]

            const getSelection = (e) => {
                let number = e.target.dataset.row;
                let row = number
                if (row === 10 || gameBoard[row] !== '') {
                    uiMangments.displayInvalidEntry()
                } else {
                    updateTheGameBoard(row, e);
                }
            };

            const updateTheGameBoard = (row, e) => {
                gameBoard[row] = currentPlayer;
                uiMangments.renderGameBoard(e);
                checkWinner()
            };

            const restartGame = (e) => {
                gameBoard = ['', '', '', '', '', '', '', '', ''];
                initializeGameBoard();
                currentPlayer = 'X';
                uiMangments.restartGame();
            }
            const changeCurrentPlayer = () => {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                uiMangments.userSelection()
            };

            const checkWinner = () => {
                for (let i = 0; i < winningCombination.length; i++) {
                    let condition = winningCombination[i];
                    let cellA = gameBoard[condition[0]];
                    let cellB = gameBoard[condition[1]];
                    let cellC = gameBoard[condition[2]];

                    if (cellA == '' || cellB == '' || cellC == '') {
                        continue;
                    }
                    if (cellA === cellB && cellB === cellC) {
                        winner = true;
                        uiMangments.renderTheGameStatusBoard()
                    }
                }

                if (!gameBoard.includes('')) {
                    uiMangments.renderTheGameStatusBoard()
                }
                changeCurrentPlayer();
            };

            return {
                getSelection,
                restartGame
            };
        })();

        const initializeGameBoard = () => {
            const uiGameBoard = document.querySelector('.game-board');
            const nextMoveBoard = document.getElementById('nextMove')
            uiMangments.gam

            uiGameBoard.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                uiGameBoard.appendChild(cell);
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