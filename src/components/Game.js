import { useEffect, useState } from "react";
import "../App.css";
import Figure from "./Figure";
import Popup from "./Popup";
import Word from "./Word";
import Navigation from "./Navigation";
import Keypad from "./Keypad";

function Game() {
  const [answer, setAnswer] = useState("FIVES");
  const [correctChars, setCorrectChars] = useState([]);
  const [wrongChars, setWrongChars] = useState([]);
  const [isInit, setIsInit] = useState(true);
  const [route, setRoute] = useState(window.location.pathname);
  const [popup, setPopup] = useState(false);
  const [gameStatus, setGameStatus] = useState();

  //// General Functions
  const getWord = async () => {
    const data = await fetch(
      "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=5&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=717e742378f817fc18008050c3603815d23932c959efecfe0"
    ).then((res) => res.json());

    const newWord = data.word?.toUpperCase() || placeHolders();
    setAnswer(newWord);
    return newWord;
  };

  const replay = async () => {
    clearChars();
    setPopup(false);
    setGameStatus();
    await getWord();
  };

  const getPlayer = () => {
    if (route === "/player-screen") return "Player";
    if (route === "/bot-screen") return "Bot";
  };

  const clearChars = () => {
    setCorrectChars([]); // Reset Correct Chars
    setWrongChars([]); // Reset Correct Chars
  };

  // Placeholder for word if the API is not working
  const placeHolders = () => {
    const placeholders = ["FREAK", "DRIVE", "SOUTH", "SLEPT", "LOOSE"];
    const len = placeholders.length;
    const index = Math.floor(Math.random() * len);
    return placeholders[index];
  };

  const checkGameStatus = () => {
    const removeDuplicates = (array) => {
      return array.filter((item, index) => array.indexOf(item) === index);
    };

    if (wrongChars.length >= 6) {
      setGameStatus(
        <span>
          The word was:{" "}
          <span className="text-green-600 font-bold">{answer}</span>
        </span>
      );
      setPopup(true);
      return;
    }

    const toCompareWithCorrectChar = removeDuplicates(answer.split(""));
    const isMatch =
      toCompareWithCorrectChar.sort().join("") === correctChars.sort().join("");

    if (isMatch) {
      setGameStatus(
        <span>
          Congratulations! The word is{" "}
          <span className="text-green-600 font-bold">{answer}</span>
        </span>
      );
      setPopup(true);
      return;
    }
  };

  //// Player Functions
  // handles user key input from client
  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    const regex = /^[A-Za-z]+$/; //condition for alphabets only

    if (!regex.test(key) || key === "ENTER") {
      // Ensures that the keys are only alphabets
      return;
    }

    // appending the correct letter onto the correctChars array
    if (answer.includes(key) && !correctChars.includes(key)) {
      setCorrectChars([...correctChars, key]);
      return;
    }

    if (!answer.includes(key) && !wrongChars.includes(key)) {
      setWrongChars([...wrongChars, key]);
      return;
    }
  };

  //// Bot Functions
  // generate random character
  function GenerateChar() {
    var key = "";
    const charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    key = charList.charAt(Math.floor(Math.random() * charList.length));

    if (answer.includes(key) && !correctChars.includes(key)) {
      setCorrectChars([...correctChars, key]);
      return;
    }

    if (!answer.includes(key) && !wrongChars.includes(key)) {
      setWrongChars([...wrongChars, key]);
      return;
    }
  }

  useEffect(() => {
    checkGameStatus();
  }, [wrongChars.length, correctChars.length]);

  useEffect(() => {
    const routeName = window.location.pathname;
    setRoute(routeName);
    if (isInit) {
      getWord();
      setIsInit(false);
      return;
    }

    if (routeName !== route) {
      // When client changes page
      getWord();
      clearChars();
      return;
    }

    if (routeName === "/player-screen" && !popup && correctChars.length <= 6) {
      // Listens for user key input
      document.addEventListener("keypress", handleKeyPress, true);

      // Removes event listener to prevent memory leak
      return () =>
        document.removeEventListener("keypress", handleKeyPress, true);
    }

    if (routeName === "/bot-screen") {
      if (wrongChars.length < 6) {
        const interval = setInterval(GenerateChar, 700);
        // Generate a random char every 700ms
        return () => clearInterval(interval);
      }
    }
  }, [answer, correctChars, wrongChars, window.location.pathname]);

  return (
    <div className="game-container">
      <Navigation />
      <div className="App App-header">
        <h1 className="text-4xl font-bold">{getPlayer()}</h1>
        <br />
        <h1 className="text-3xl md:text-6xl font-bold">Guess the Word</h1>
      </div>
      <div className="game">
        <Figure wrongChars={wrongChars} />
        <br />
        <Word data={answer} correctChars={correctChars} />
        <br />
        <Keypad
          wrongChars={wrongChars}
          correctChars={correctChars}
          handleKeyPress={handleKeyPress}
        />
      </div>

      {popup && <Popup gameStatus={gameStatus} replay={replay} />}
    </div>
  );
}

export default Game;
