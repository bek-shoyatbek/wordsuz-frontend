import React, { useState } from "react";
import "./SearchInput.css";

interface SearchInputProps {
  onSearch: (word: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [word, setWord] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(word);
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={word}
        onChange={(e) => {
          const newWord = e.target.value;
          setWord(newWord);
        }}
        placeholder="Enter a word"
        className="search-input"
      />
      <button type="button" className="search-button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
