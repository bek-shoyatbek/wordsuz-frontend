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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a word"
        className="search-input"
      />
    </div>
  );
}
