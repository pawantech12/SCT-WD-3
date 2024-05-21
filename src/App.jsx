import React, { useState } from "react";
import Home from "./components/Home";
import Board from "./components/Board";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [playerChoice, setPlayerChoice] = useState("X");
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  const [gameStarted, setGameStarted] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const handlePlayerChoiceChange = (choice) => {
    setPlayerChoice(choice);
  };
  const handleStartGame = (player1, player2) => {
    setPlayer1(player1);
    setPlayer2(player2);
    setGameStarted(true);
  };

  return (
    <div className={`h-screen `}>
      {/* Your app content here */}
      {gameStarted ? (
        <Board
          player1={player1}
          player2={player2}
          handlePlayerChoiceChange={handlePlayerChoiceChange}
          playerChoice={playerChoice}
        />
      ) : (
        <Home
          onStart={handleStartGame}
          handlePlayerChoiceChange={handlePlayerChoiceChange}
          playerChoice={playerChoice}
          setPlayerChoice={setPlayerChoice}
        />
      )}
    </div>
  );
};

export default App;
