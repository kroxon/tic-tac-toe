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
    let value = 0;

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

    const playRound = (row, column) => {
        console.log(
            `The ${getActivePlayer().name}  selects cell ${row} ${column}...`
        );
        if (board.markCell(row, column, getActivePlayer().mark)) {

            /*  This is where we would check for a winner and handle that logic,
                such as a win message. */

            switchPlayerTurn();
            printNewRound();
        } 
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();