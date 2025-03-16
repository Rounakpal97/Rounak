const board = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

let selectedPiece = null;
let selectedRow = null;
let selectedCol = null;
let turn = "white";

function createBoard() {
    const chessboard = document.getElementById("chessboard");
    chessboard.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");
            square.dataset.row = row;
            square.dataset.col = col;

            const piece = board[row][col];
            if (piece) {
                const pieceElement = document.createElement("span");
                pieceElement.textContent = piece;
                pieceElement.classList.add("piece");
                pieceElement.dataset.row = row;
                pieceElement.dataset.col = col;
                pieceElement.addEventListener("click", selectPiece);
                square.appendChild(pieceElement);
            }

            square.addEventListener("click", movePiece);
            chessboard.appendChild(square);
        }
    }

    document.getElementById("turn-indicator").textContent = `Turn: ${turn.charAt(0).toUpperCase() + turn.slice(1)}`;
}

function selectPiece(event) {
    const piece = event.target.textContent;
    const pieceColor = piece === piece.toUpperCase() ? "white" : "black";

    if (pieceColor !== turn) return;

    if (selectedPiece) {
        selectedPiece.classList.remove("selected");
    }
    selectedPiece = event.target;
    selectedRow = selectedPiece.dataset.row;
    selectedCol = selectedPiece.dataset.col;
    selectedPiece.classList.add("selected");
}

function movePiece(event) {
    if (!selectedPiece) return;

    const toRow = event.target.dataset.row;
    const toCol = event.target.dataset.col;

    if (isValidMove(selectedRow, selectedCol, toRow, toCol)) {
        board[toRow][toCol] = board[selectedRow][selectedCol];
        board[selectedRow][selectedCol] = "";
        turn = turn === "white" ? "black" : "white";
        selectedPiece = null;
        createBoard();
    }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    fromRow = parseInt(fromRow);
    fromCol = parseInt(fromCol);
    toRow = parseInt(toRow);
    toCol = parseInt(toCol);

    const piece = board[fromRow][fromCol];

    if (!piece) return false;

    const pieceColor = piece === piece.toUpperCase() ? "white" : "black";
    if (pieceColor !== turn) return false;

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    switch (piece.toLowerCase()) {
        case "♙": // Pawn
            const direction = pieceColor === "white" ? -1 : 1;
            if (colDiff === 0 && board[toRow][toCol] === "" && (toRow - fromRow === direction || (fromRow === (pieceColor === "white" ? 6 : 1) && toRow - fromRow === 2 * direction)))
                return true;
            if (colDiff === 1 && rowDiff === 1 && board[toRow][toCol] !== "" && board[toRow][toCol] !== piece)
                return true;
            break;

        case "♜": // Rook
            if (rowDiff === 0 || colDiff === 0) return true;
            break;

        case "♞": // Knight
            if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) return true;
            break;

        case "♝": // Bishop
            if (rowDiff === colDiff) return true;
            break;

        case "♛": // Queen
            if (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) return true;
            break;

        case "♚": // King
            if (rowDiff <= 1 && colDiff <= 1) return true;
            break;
    }

    return false;
}

createBoard();
