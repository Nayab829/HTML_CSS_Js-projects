//selectors
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart-btn");
const alertBox = document.querySelector(".alert-box")
//variables
let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;
//start function
const startGame = () => {
    cells.forEach((cell) => {
        cell.addEventListener("click", handleClick);

    })
}
//handle click function
const handleClick = (e) => {
    if (e.target.innerText === "") {
        e.target.innerText = playerTurn;
        if (checkWinner()) {
            console.log(`congratulation winner is ${playerTurn}`);
            showResult(`${playerTurn} is winner 😻`);
            disableCells()
        } else if (checkTie()) {
            showResult(`Its a Tie...!!!!`);
            disableCells()
        } else {
             changeTurn()
             showResult(`${playerTurn}: turn`)
        }
    }
}
//change turn
const changeTurn = () => {
    playerTurn = playerTurn == currentPlayer ? nextPlayer : currentPlayer;
}
//check tie
const checkTie = () => {
    let emptyCellCount = 0;
    cells.forEach((cell) => {
        if (cell.innerText == "") {
            emptyCellCount++;
        }
    })
    return emptyCellCount == 0 && !checkWinner();
}
//show results
const showResult = (msg) => {
    alertBox.style.display = "block";
    alertBox.innerText = msg;
}
//check winner
const checkWinner = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const [pos1, pos2, pos3] = winConditions[i];
        if (cells[pos1].innerText !== "" && cells[pos1].innerText === cells[pos2].innerText && cells[pos2].innerText === cells[pos3].innerText) {
            return true;
        }

    }
    return false;
}
//disbale cells
const disableCells = () => {
    cells.forEach((cell) => {
        cell.removeEventListener("click", handleClick);
        cell.classList.add("disabled");
    })
}
// restartBtn
restartBtn.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.innerText = "";
        cell.classList.remove("disabled");

    })
    startGame()
})
startGame();
