const grid = document.querySelector(".grid");
let prevSign = null;
let board = Array.from(Array(3), () => new Array(3).fill(0));
let winner = null;

grid.addEventListener("click", function (e) {
  if (e.target.classList.contains("col")) {
    if (e.target.innerHTML !== "" || winner) return;
    e.target.innerHTML = prevSign && prevSign === "X" ? "O" : "X";
    prevSign = prevSign && prevSign === "X" ? "O" : "X";
    let col = e.target.getAttribute("data-col");
    let row = e.target.getAttribute("data-row");
    board[row][col] = prevSign;
    const isWinner = findWinner();
    if (isWinner) {
      winner = isWinner;
      alert("We have WINNER!!" + winner);
      return;
    }
    updateTurn();
  }
});

function updateTurn() {
  const turn = document.querySelector("#turn span");
  turn.innerText = prevSign && prevSign === "X" ? "O" : "X";
}
updateTurn();

function findWinner() {
  // check rows
  for (let i = 0; i < board.length; i++) {
    if (board[0][0] && board[i].every((item) => item && item === board[0][0])) {
      return board[0][0];
    }
  }

  // check cols
  for (let col = 0; col < board.length; col++) {
    let isWinner = [];
    for (let row = 0; row < board[col].length; row++) {
      if (board[row][col] && board[row][col] === board[0][col]) {
        isWinner.push(true);
      } else {
        isWinner.push(false);
      }
    }
    if (isWinner.every((item) => item === true)) {
      return board[0][col];
    }
  }

  // check diagonals
  // ltr diagonal
  let r = 0;
  let c = 0;
  let isWinner = [];
  while (r < board.length) {
    if (board[r][c] && board[r][c] === board[0][0]) {
      isWinner.push(true);
    } else {
      isWinner.push(false);
    }
    r++;
    c++;
  }

  if (isWinner.every((item) => item === true)) {
    return board[0][0];
  }

  // rtl diagonal

  let c_c = board.length - 1;
  let r_r = 0;
  isWinner = [];
  while (r_r < board.length) {
    if (board[r_r][c_c] && board[r_r][c_c] === board[0][2]) {
      isWinner.push(true);
    } else {
      isWinner.push(false);
    }
    r_r++;
    c_c--;
  }

  if (isWinner.every((item) => item === true)) {
    return board[0][2];
  }

  return null;
}
