const Square = ({ value, onClick, className }) => {
  return (
    <button
      className={`w-24 h-24 flex items-center bg-[#1F3641] ${
        value === "X" ? "text-teal-400" : "text-amber-400"
      } rounded-md border border-gray-400 justify-center text-4xl font-bold ${className}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
