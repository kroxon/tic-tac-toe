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

    function Winner() {
        let winner = null;

        const setWinner = (player) => {
            winner = player;
        };

        const getWinner = () => winner;

        return {
            setWinner,
            getWinner
        };
    }

    const playRound = (row, column) => {
        console.log(
            `The ${getActivePlayer().name} selects cell ${row} ${column}...`
        );
        if (board.markCell(row, column, getActivePlayer().mark)) {

            /*  This is where we would check for a winner and handle that logic,
                such as a win message. */

            const winner = Winner();

            board.getBoard().forEach(row => {
                let count = 0;
                const a = row[0].getValue();
                row.forEach(element => {
                    if (element.getValue() === a && a != 0)
                        count++;
                    if (count === board.getBoard().length)
                        winner.setWinner(getActivePlayer().name);
                });
            });

            for (i = 0; i < board.getBoard().length; i++) {
                let count = 0;
                const mark = board.getBoard()[i][0].getValue();
                for (j = 0; j < board.getBoard().length; j++) {
                    if (board.getBoard()[j][i].getValue() === mark && mark != 0)
                        count++
                    if (count === board.getBoard().length)
                        winner.setWinner(getActivePlayer().name);
                }
            }

            let count = 0;
            let mark = board.getBoard()[0][0].getValue();
            for (i = 0; i < board.getBoard().length; i++) {
                if (board.getBoard()[i][i].getValue() === mark && mark != 0)
                    count++
                if (count === board.getBoard().length)
                    winner.setWinner(getActivePlayer().name);
            }

            count = 0;
            mark = board.getBoard()[board.getBoard().length - 1][0].getValue();
            for (i = 0; i < board.getBoard().length; i++) {
                if (board.getBoard()[board.getBoard().length - 1 - i][i].getValue() === mark && mark != 0)
                    count++
                if (count === board.getBoard().length)
                    winner.setWinner(getActivePlayer().name);
            }

            if (winner.getWinner() === null) {
                switchPlayerTurn();
                printNewRound();
            }
            else
                console.log(
                    `${winner.getWinner()} wins!`
                );
            board.printBoard();
        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();