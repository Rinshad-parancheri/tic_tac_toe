const GameModule = (() => {
    const createGame = () => {
        let currentPlayer = 'X';
        const uiGameBoard = document.querySelector('.game-board');
        const nextMoveBoard = document.getElementById('nextMove').innerText 
        nextMoveBoard.innerText =  `It's ${currentPlayer} move`
       
        const getSelection = (e) => {
            let number = e.target.getAttribute('data-row');
            const [row, col] = findGridPosition(number);
            if (row === 10 || col === 10 || typeof gameBoard[row][col] !== 'number') {
                const nextMoveBoard = document.getElementById('nextMove').innerText = 'invalid  move choose corectly' 
            } else {
                updateTheGameBoard(row, col, e);
            }

        };

        function renderGameBoard() {
            let count = 1;
            for (let i = 0; i < 3; i++) {

                for (let j = 0; j < 3; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.dataset.row = count;
                    cell.addEventListener('click', getSelection)
                    uiGameBoard.appendChild(cell);
                    count++
                }
            }

        }

        let gameBoard = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        const updateTheGameBoard = (row, col, e) => {
            gameBoard[row][col] = currentPlayer;
            updateGameBoardInUi(e);
            updateTheGameStatusInUi();
        };

        const updateTheGameStatusInUi = () => {
            if (checkWinner()) {
                renderTheGameStatusBoard()
            } else if (isBoardFull()) {
                renderTheGameStatusBoard()
            } else {
                changeCurrentPlayer();
            }
        }

        function renderTheGameStatusBoard(){
            const gameStatusTextBoard = document.getElementById('gameStatusText');
            const overLay = document.getElementById('overlay');
            const overLayContent = document.getElementById('overlayContent');
            overLay.style.display='block';
            
            overLayContent.classList.add('active');
            (isBoardFull())?gameStatusTextBoard.innerText = 'The game is draw':gameStatusTextBoard.innerText = `${currentPlayer} wins the game`
            const  restartBtn = document.getElementById('restartBtn');
              restartBtn.onclick = (e) => restartGame(overLay, overLayContent, gameStatusTextBoard)
        }

        function restartGame(overLay, overLayContent,gameStatusTextBoard){
            overLay.style.display = 'none';
            gameStatusTextBoard.innerText = '';
            overLayContent.classList.remove('active');

            uiGameBoard.innerHTML = '';
            gameBoard = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            renderGameBoard();
            currentPlayer = 'X';
            nextMoveBoard.innerText = currentPlayer;
        }

        const updateGameBoardInUi = (e) => {
            e.target.innerText = currentPlayer
        }
        const changeCurrentPlayer = () => {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            const nextMoveBoard = document.getElementById('nextMove').innerText = `It's ${currentPlayer} move`
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

        return {renderGameBoard};
    };

    return { createGame };
})();

const UIModule = (() => {

    const startGame = () => {
        const game = GameModule.createGame();
        game.renderGameBoard();
    };

    return { startGame };
})();

UIModule.startGame();