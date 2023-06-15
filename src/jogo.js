import React, { useState } from "react";
import './jogo.css';

const Square = ({ value, onClick }) => {
    return (
        <button className="square" onClick={onClick}>
        {value}
        </button>
    );
};

const Board = ({ squares, onClick }) => {
    return (
        <div className="board">
        {squares.map((value, index) => (
            <Square key={index} value={value} onClick={() => onClick(index)} />
        ))}
        </div>
    );
};

const Jogo = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
        if (calculateWinner(squares) || squares[index]) {
        return;
        }

        const newSquares = [...squares];
        newSquares[index] = xIsNext ? "X" : "O";

        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const restartGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (squares.every((square) => square !== null)) {
        status = "It's a draw!";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
        <Board squares={squares} onClick={handleClick} />
        <div className="status">{status}</div>
        <button className="restart" onClick={restartGame}>
            Restart
        </button>
        </div>
    );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
        ) {
        return squares[a];
        }
    }

    return null;
};

export default Jogo;
