function Word(props) {
  const { data, correctChars } = props;

  const splitWords = (word) => {
    const res = word.split("");
    return res;
  };

  const splitAnswer = splitWords(data);

  return (
    <div className="flex justify-center w-full px-10">
      <ul className="flex flex-row flex-wrap gap-5 text-2xl md:text-5xl">
        {splitAnswer.map((char, index) => (
          <li
            key={index}
            className="border-b-2 md:border-b-8 w-8 h-10 md:w-20 md:h-20 text-center items-center"
          >
            {correctChars.includes(char) && char}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Word;
