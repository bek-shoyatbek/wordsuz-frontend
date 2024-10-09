import React, { useState, useEffect } from "react";
import { SearchInput } from "./components/SearchInput";
import { WordDetails } from "./components/WordDetails";
import { Examples } from "./components/Examples";
import { Comments } from "./components/Comments";
import "./App.css";

const API_URL = "https://words.uz/api/word";

interface WordData {
  resultEng: {
    word: string;
    results: Array<{
      definition: string;
      partOfSpeech: string;
      synonyms?: string[];
      hasTypes?: string[];
      derivation?: string[];
      examples?: string[];
    }>;
    syllables: {
      count: number;
      list: string[];
    };
    pronunciation: {
      all: string;
    };
    frequency: number;
  };
  resultUz: {
    word: string;
    translations: Array<{
      definition: string;
      synonyms?: string[];
      examples?: string[];
      partOfSpeech: string;
    }>;
  };
}

const INITIAL_WORDS = [
  "apple",
  "book",
  "cat",
  "dog",
  "elephant",
  "frog",
  "guitar",
  "house",
  "island",
  "jungle",
  "kite",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "piano",
  "quilt",
  "rainbow",
  "sun",
  "tree",
];

const App: React.FC = () => {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [initialWords, setInitialWords] = useState<string[]>([]);

  useEffect(() => {
    setInitialWords(getRandomWords(10));
  }, []);

  const getRandomWords = (count: number): string[] => {
    const shuffled = INITIAL_WORDS.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const fetchWordData = async (word: string) => {
    try {
      const response = await fetch(`${API_URL}/${word}`);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data = await response.json();
      setWordData(data);
    } catch (error) {
      console.error("Error fetching word data:", error);
      setWordData(null);
    }
  };

  const getExamples = () => {
    if (wordData && wordData.resultEng && wordData.resultEng.results) {
      return wordData.resultEng.results.flatMap((r) => r.examples || []);
    }
    return [];
  };

  const handleSearch = (word: string) => {
    fetchWordData(word);
  };

  const handleWordClick = (word: string) => {
    fetchWordData(word);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="nav-bar">
          <div className="menu-container">
            <button className="menu-icon">☰</button>
            <div className="menu">
              <a href="#profile">Profile</a>
              <a href="#settings">Settings</a>
              <a href="#logout">Logout</a>
            </div>
          </div>
          <SearchInput onSearch={handleSearch} />
          <button className="login-button">Login</button>
        </div>
      </header>
      <main className="main-content">
        <div className="left-column">
          {wordData && <WordDetails wordData={wordData} />}
          <AlphabetList onWordClick={handleWordClick} />
          <div className="initial-words">
            <h2>Explore these words:</h2>
            {initialWords.map((word) => (
              <button key={word} onClick={() => handleWordClick(word)}>
                {word}
              </button>
            ))}
          </div>
          <Comments />
        </div>
        <div className="right-column">
          {wordData && (
            <>
              <div className="usage-frequency">
                <h3>Usage Frequency</h3>
                <p>{wordData.resultEng.frequency} per million words</p>
              </div>
              <Examples examples={getExamples()} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const AlphabetList: React.FC<{ onWordClick: (word: string) => void }> = ({
  onWordClick,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    if (selectedLetter) {
      const simulatedWords = INITIAL_WORDS.filter((word) =>
        word.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
      setWords(simulatedWords);
    }
  }, [selectedLetter]);

  return (
    <div className="alphabet-list">
      <h2>Explore words by letter:</h2>
      <div className="letters">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            style={{
              backgroundColor:
                selectedLetter === letter ? "#45a049" : "#008cba",
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="words">
        {words.map((word) => (
          <button key={word} onClick={() => onWordClick(word)}>
            {word}
          </button>
        ))}
      </div>
    </div>
  );

};

export default App;
