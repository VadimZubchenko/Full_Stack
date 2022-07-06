import "./App.css";
import { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["banaani", "omena", "olutta", "jäätelö"];
  const word = words[currentWord];

  const computeWordLength = (word) => {
    let i = 0;
    while (i < 1000000000) {
      i++;
    }
    return word.length;
  };
  // const wordLength = computeWordLength(word);
  // kannata kokeilla ensin ilman useMemo että nähdä eroa
  //const wordLength = computeWordLength(word);
  const wordLength = useMemo(() => computeWordLength(word), [word]);

  return (
    <div className="App">
      <h3>Compute the length of the word {word}</h3>
      <h3>
        {word} has {wordLength} letters
      </h3>
      <button
        onClick={() => {
          const next = currentWord + 1 === words.length ? 0 : currentWord + 1;
          setCurrentWord(next);
        }}
      >
        Next Word
      </button>
      <h3>Increment counter</h3>
      <h3>Current value:{count}</h3>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
    </div>
  );
}

export default App;
