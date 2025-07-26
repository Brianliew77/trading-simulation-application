import React from "react";
import Confetti from "react-confetti";

function Popup(props) {
  const { replay, gameStatus } = props; // Deconstructs props
  const isConfetti = gameStatus.props.children === "Congratulations!";

  return (
    <div className="bg-[#32474c] bg-opacity-10 backdrop-blur-sm fixed content-center justify-center items-center flex w-full h-full">
      {isConfetti ? (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      ) : (
        <div />
      )}
      <div className="bg-zinc-50 rounded-lg text-center p-5 min-w-[256px] max-w-[256px] max-h-36">
        <h2>{gameStatus}</h2>
        <br />
        <button
          onClick={replay}
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Popup;
