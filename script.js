function Board() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    function resetBoard() {
        board.splice(0, board.length);

        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(Cell());
            }
        }
    }

    const markCell = (row, column, player) => {
        const availableCell = board[row][column];

        if (availableCell.getValue()) return 0;
        availableCell.addMark(player)
        return 1;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, markCell, printBoard, resetBoard };
}

function Cell() {
    let value = "";

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Board();

    const players = [
        {
            name: playerOneName,
            mark: "◯"
        },
        {
            name: playerTwoName,
            mark: "X"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const resetBoard = () => {
        board.resetBoard();
        activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;

    const getPlayers = () => players;

    const setPlayersNames = (name1, name2) => {
        players[0].name = name1;
        players[1].name = name2;
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkLine = (line) => {
        const firstValue = line[0].getValue();
        return firstValue !== "" && line.every(cell => cell.getValue() === firstValue);
    };

    const checkForWinner = () => {
        const boardArray = board.getBoard();
        const size = boardArray.length;

        for (let row = 0; row < size; row++) {
            if (checkLine(boardArray[row])) {
                return getActivePlayer().name;
            }
        }

        for (let col = 0; col < size; col++) {
            const column = boardArray.map(row => row[col]);
            if (checkLine(column)) {
                return getActivePlayer().name;
            }
        }

        const diagonal1 = boardArray.map((row, index) => row[index]);
        const diagonal2 = boardArray.map((row, index) => row[size - 1 - index]);

        if (checkLine(diagonal1) || checkLine(diagonal2)) {
            return getActivePlayer().name;
        }

        return null;
    };

    const playRound = (row, column) => {
        console.log(`The ${getActivePlayer().name} selects cell ${row} ${column}...`);

        if (board.markCell(row, column, getActivePlayer().mark)) {
            const winner = checkForWinner();

            if (winner) {
                console.log(`${winner} wins!`);
                board.printBoard();
            } else {
                switchPlayerTurn();
                printNewRound();
            }
        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        resetBoard,
        setPlayersNames,
        getPlayers
    };
}

function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector(".board");
    const favDialog = document.getElementById("favDialog");
    const startBtn = favDialog.querySelector("#startBtn");
    const restartBtn = document.querySelector("#restartBtn");
    const renameBtn = document.querySelector("#renameBtn");
    const activePlayer = document.querySelector("#activePlayer");
    const playerOneInput = favDialog.querySelector('input[name="playerOne"]');
    const playerTwoInput = favDialog.querySelector('input[name="playerTwo"]');
    const playerOneNameLabel = document.querySelector('#p1Name');
    const playerTwoNameLabel = document.querySelector('#p2Name');

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const size = board.length;
        activePlayer.textContent = game.getActivePlayer().name;

        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                const cell = document.createElement('button');
                cell.classList.add("cell");
                cell.dataset.column = j;
                cell.dataset.row = i;
                cell.textContent = board[i][j].getValue();
                boardDiv.appendChild(cell);
            }
        }

        console.log(game.getPlayers());
        playerOneNameLabel.textContent = game.getPlayers()[0].name;
        playerTwoNameLabel.textContent = game.getPlayers()[1].name;
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (!selectedColumn) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }


    boardDiv.addEventListener("click", clickHandlerBoard);

    function openDialog() {
        favDialog.showModal();
    }

    startBtn.addEventListener("click", () => {
        const name1 = playerOneInput.value || "Player One";
        const name2 = playerTwoInput.value || "Player Two";
        game.setPlayersNames(name1, name2);
        favDialog.close();
        updateScreen();
    });

    restartBtn.addEventListener("click", () => {
        game.resetBoard();
        updateScreen();
    });

    updateScreen();
    openDialog();

}

const screen = ScreenController();
