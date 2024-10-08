import React, { useState, useEffect } from "react";
import { SearchInput } from "./components/SearchInput";
import { WordInfo } from "./components/WordInfo";
import { Examples } from "./components/Examples";
import { Comments } from "./components/Comments";
import "./App.css";

const API_URL = "https://s2tvrgs9-3000.euw.devtunnels.ms";

interface WordData {
  word: string;
  results: Array<{
    definition: string;
    partOfSpeech: string;
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
  const [searchWord, setSearchWord] = useState<string>("");
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
      const response = await fetch(`${API_URL}/word/${word}`);
      const data = await response.json();
      setWordData(data);
      setSearchWord(word);
    } catch (error) {
      console.error("Error fetching word data:", error);
    }
  };

  const getExamples = () => {
    if (wordData && wordData.results) {
      return wordData.results?.flatMap((r) => r.examples || []);
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
        <h1 className="title">words.uz</h1>
      </header>
      <main className="main-content">
        <div className="left-column">
          <SearchInput onSearch={handleSearch} />
          {wordData && <WordInfo key={searchWord} wordData={wordData} />}
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
          {wordData && <Examples key={searchWord} examples={getExamples()} />}
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
        word.toLowerCase().startsWith(selectedLetter.toLowerCase()),
      );
      setWords(simulatedWords);
    }
  }, [selectedLetter]);

  return (
    <div className="alphabet-list">
      <h2>Explore words by letter:</h2>
      <div className="letters">
        {alphabet.map((letter) => (
          <button key={letter} onClick={() => setSelectedLetter(letter)}>
            {letter}
          </button>
        ))}
      </div>
      {selectedLetter && (
        <div className="words">
          <h3>Words starting with '{selectedLetter}':</h3>
          {words.map((word) => (
            <button key={word} onClick={() => onWordClick(word)}>
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
