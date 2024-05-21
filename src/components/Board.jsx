import React, { useState, useEffect } from "react";
import Square from "./Square";
import { IoMdRefresh } from "react-icons/io";

const Board = ({ player1, player2, playerChoice }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isComputer, setIsComputer] = useState(player2 === "Computer");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [winningLine, setWinningLine] = useState([]);

  const computerChoice = playerChoice === "X" ? "O" : "X";

  useEffect(() => {
    if (isComputer && !xIsNext && !winner && !draw) {
      const timer = setTimeout(makeComputerMove, 1000);
      return () => clearTimeout(timer); // Clean up the timeout if component unmounts
    }
  }, [squares, xIsNext, winner, draw]);

  const handleClick = (index) => {
    if (winner || draw || squares[index]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? playerChoice : computerChoice;
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const makeComputerMove = () => {
    const emptyIndices = squares
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newSquares = squares.slice();
    newSquares[randomIndex] = computerChoice;
    setSquares(newSquares);
    setXIsNext(true);
  };

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (isDraw(squares)) {
      setDraw(true);
    }
  }, [squares]);

  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index);
    const winningClass =
      winner === "X" ? "bg-teal-400 text-white" : "bg-amber-400 text-white";

    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => handleClick(index)}
        className={isWinningSquare ? winningClass : ""}
      />
    );
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setDraw(false);
    setWinningLine([]);
    setXIsNext(true);
  };

  return (
    <div className="bg-dark-primary relative">
      <div className="flex flex-col relative items-center w-96 max-sm:w-80 mx-auto justify-center h-screen">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-5xl font-extrabold text-amber-400">
            <span className="text-teal-400 mr-2">X</span>O
          </h1>
          <div className="status text-xl bg-[#1F3641] py-2 px-3 rounded-md text-slate-400">
            {xIsNext ? player1 : player2} turn
          </div>
          <button
            className="text-2xl bg-slate-400 rounded-md p-2"
            onClick={resetGame}
          >
            <IoMdRefresh />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {Array(9)
            .fill(null)
            .map((_, index) => renderSquare(index))}
        </div>
      </div>
      {winner && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-[#1F3641] w-full gap-5 flex flex-col justify-center items-center py-5 px-6">
            <small className="text-slate-400 text-xl font-medium">
              {winner === playerChoice ? "You" : player2} Won
            </small>
            <h2
              className={`${
                winner === "X" ? "text-teal-400 " : "text-amber-400"
              } text-3xl`}
            >
              {winner === playerChoice ? player1 : player2} Takes the Round
            </h2>
            <div className="flex gap-4">
              <button
                className="text-xl pb-4 bg-slate-400 hover:bg-slate-300 rounded-xl px-4 py-2 shadow-[inset_0_-4px_0_#6b8997]"
                onClick={() => window.location.reload()}
              >
                Close
              </button>
              {(winner || draw) && (
                <button
                  className={`px-4 py-2 pb-4 text-xl font-medium ${
                    winner === "X"
                      ? "bg-teal-400 hover:bg-teal-300 shadow-[inset_0_-4px_0_#118C87]"
                      : "bg-amber-400 hover:bg-amber-300 shadow-[inset_0_-4px_0_#cc8b13]"
                  }  text-dark-primary rounded-xl`}
                  onClick={resetGame}
                >
                  Play Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {draw && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-[#1F3641] w-full gap-5 flex flex-col justify-center items-center py-5 px-6">
            <small className="text-slate-400 text-xl font-medium">Draw !</small>
            <h2 className={`text-red-400 text-3xl`}>No one Won the Game</h2>
            <div className="flex gap-4">
              <button
                className="text-xl pb-4 bg-slate-400 hover:bg-slate-300 rounded-xl px-4 py-2 shadow-[inset_0_-4px_0_#6b8997]"
                onClick={() => window.location.reload()}
              >
                Close
              </button>
              {(winner || draw) && (
                <button
                  className={`px-4 py-2 pb-4 text-xl font-medium bg-red-400 hover:bg-red-300 shadow-[inset_0_-4px_0_#ef4444] text-dark-primary rounded-xl`}
                  onClick={resetGame}
                >
                  Play Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
};

const isDraw = (squares) => {
  return (
    squares.every((square) => square !== null) &&
    !calculateWinner(squares).winner
  );
};

export default Board;
