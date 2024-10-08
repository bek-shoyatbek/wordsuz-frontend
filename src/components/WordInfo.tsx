import React from "react";
import "./WordInfo.css";

interface WordInfoProps {
  wordData: {
    word: string;
    results: Array<{
      definition: string;
      partOfSpeech: string;
      hasTypes?: string[];
      derivation?: string[];
    }>;
  };
}

export const WordInfo: React.FC<WordInfoProps> = ({ wordData }) => {
  console.log("wordInfo: ", wordData);
  return (
    <div className="word-info">
      <h2 className="word-title">{wordData.word}</h2>
      {wordData.results?.map((result, index) => (
        <div key={index} className="word-result">
          <p>
            <strong>Definition:</strong> {result.definition}
          </p>
          <p>
            <strong>Part of Speech:</strong> {result.partOfSpeech}
          </p>
          {result.hasTypes && (
            <p>
              <strong>Types:</strong> {result.hasTypes.join(", ")}
            </p>
          )}
          {result.derivation && (
            <p>
              <strong>Derivations:</strong> {result.derivation.join(", ")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
