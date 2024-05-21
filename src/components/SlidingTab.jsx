import React from "react";

const SlidingTab = ({ playerChoice, setPlayerChoice }) => {
  const toggleChoice = () => {
    setPlayerChoice((prevChoice) => (prevChoice === "X" ? "O" : "X"));
  };

  return (
    <div className="flex items-center flex-col gap-3 bg-[#1F3641] pb-6 shadow-[inset_0_-8px_0_#10212A] rounded-xl py-4 justify-center my-4">
      <h2 className="text-slate-400 uppercase font-medium">
        Pick Player 1 Symbol
      </h2>
      <div
        className={`relative w-56 h-14 flex items-center rounded-md p-2 cursor-pointer transition duration-300 ease-in-out bg-dark-primary`}
        onClick={toggleChoice}
      >
        <div
          className={`absolute w-24 h-10 bg-white rounded-md shadow-md transform transition-transform duration-300 ease-in-out ${
            playerChoice === "X" ? "translate-x-0" : "translate-x-[118%]"
          }`}
        ></div>
        <div
          className={`absolute left-11 top-3 text-2xl font-bold ${
            playerChoice === "X" ? "text-neutral-800" : "text-white"
          }`}
        >
          X
        </div>
        <div
          className={`absolute right-11 top-3 text-2xl font-bold ${
            playerChoice === "O" ? "text-neutral-800" : "text-white"
          }`}
        >
          O
        </div>
      </div>
    </div>
  );
};

export default SlidingTab;
