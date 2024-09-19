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

    return { getBoard, markCell, printBoard };
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

    const getActivePlayer = () => activePlayer;

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
        getBoard: board.getBoard
    };
}

function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector(".board");

    const displayBoard = () => {
        const size = game.getBoard().length
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                const cell = document.createElement('button');
                cell.classList.add("cell");
                cell.textContent = game.getBoard()[i][j].getValue();
                boardDiv.appendChild(cell);
            }
        }
    }

    game.playRound(0, 1);
    displayBoard();

}

const screen = ScreenController();
