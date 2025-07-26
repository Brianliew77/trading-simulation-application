export default function Keypad(props) {
  const { wrongChars, correctChars, handleKeyPress } = props;
  const alphabets = [...Array(26)].map((x, index) =>
    String.fromCharCode(65 + index)
  );

  const buttonStyle = (alphabet) => {
    const style =
      "w-10 h-10 font-bold sm:w-14 sm:h-14 md:w-20 md:h-20 sm:text-3xl md:text-4xl ";
    if (correctChars.includes(alphabet)) {
      return style + "bg-green-400";
    }

    if (wrongChars.includes(alphabet)) {
      return style + "bg-red-400";
    }

    return style;
  };

  return (
    <div className="flex flex-col gap-2 p-4 justify-center w-full max-w-4xl">
      <div>type or click below to play</div>
      <div className="flex flex-row flex-wrap justify-center">
        {alphabets.map((alphabet, index) => (
          <button
            key={index}
            className={buttonStyle(alphabet)}
            onClick={(e) => {
              e.key = alphabet;
              handleKeyPress(e);
            }}
          >
            {alphabet}
          </button>
        ))}
      </div>
    </div>
  );
}
