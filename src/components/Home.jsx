import React, { useState } from "react";

import SlidingTab from "./SlidingTab";

const Home = ({
  onStart,
  handlePlayerChoiceChange,
  playerChoice,
  setPlayerChoice,
}) => {
  const [mode, setMode] = useState(null);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Error, setPlayer1Error] = useState("");
  const [player2Error, setPlayer2Error] = useState("");
  // Default player choice

  const validateInputs = () => {
    let isValid = true;
    if (!player1) {
      setPlayer1Error("Player 1 name is required");
      isValid = false;
    } else {
      setPlayer1Error("");
    }
    if (mode === "player" && !player2) {
      setPlayer2Error("Player 2 name is required");
      isValid = false;
    } else {
      setPlayer2Error("");
    }
    return isValid;
  };

  const handleStartGame = () => {
    if (validateInputs()) {
      if (mode === "computer") {
        onStart(player1, "Computer", playerChoice);
      } else if (mode === "player") {
        onStart(player1, player2, playerChoice);
      }
    }
  };

  return (
    <div className="bg-dark-primary h-screen ">
      <div className="w-96 mx-auto flex flex-col items-center space-y-4 h-screen justify-center">
        <h1 className="text-5xl font-extrabold mb-4 text-amber-400">
          <span className="text-teal-400 mr-2">X</span>O
        </h1>
        {!mode && (
          <>
            <button
              className="px-4 py-2 pb-4 w-56 text-xl font-medium bg-teal-400 hover:bg-teal-300 shadow-[inset_0_-8px_0_#118C87] text-dark-primary rounded-xl"
              onClick={() => setMode("computer")}
            >
              Play with Computer
            </button>
            <button
              className="px-4 py-2 pb-4 w-56 text-xl font-medium bg-amber-400 hover:bg-amber-300 shadow-[inset_0_-8px_0_#cc8b13] text-dark-primary rounded-xl"
              onClick={() => setMode("player")}
            >
              Play with Player
            </button>
          </>
        )}
        {mode && (
          <div className="flex flex-col space-y-4 w-full">
            <SlidingTab
              playerChoice={playerChoice}
              setPlayerChoice={setPlayerChoice}
            />
            <input
              type="text"
              placeholder="Enter Player 1 Name"
              className={`px-4 py-2 h-12 border bg-[#1F3641] ${
                player1Error ? "border-red-500" : "border-[#10212A]"
              } text-slate-400 outline-none rounded-md`}
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            {player1Error && (
              <span className="text-red-500 text-sm">{player1Error}</span>
            )}
            {mode === "player" && (
              <>
                <input
                  type="text"
                  placeholder="Enter Player 2 Name"
                  className={`px-4 py-2 h-12 border bg-[#1F3641] ${
                    player2Error ? "border-red-500" : "border-[#10212A]"
                  }  text-slate-400 outline-none rounded-md`}
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                />
                {player2Error && (
                  <span className="text-red-500 text-sm">{player2Error}</span>
                )}
              </>
            )}
            <button
              className="px-4 py-2 pb-4 text-xl font-medium bg-amber-400 hover:bg-amber-300 shadow-[inset_0_-8px_0_#cc8b13] text-dark-primary rounded-xl"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
