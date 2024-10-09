import React from "react";
import "./WordInfo.css";

interface WordInfoProps {
  wordData: {
    resultEng: {
      word: string;
      results: Array<{
        definition: string;
        partOfSpeech: string;
        synonyms?: string[];
        hasTypes?: string[];
        derivation?: string[];
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
  };
}

export const WordInfo: React.FC<WordInfoProps> = ({ wordData }) => {
  const { resultEng, resultUz } = wordData;

  return (
    <div className="word-info">
      <h2 className="word-title">{resultEng.word}</h2>
      <p><strong>Pronunciation:</strong> {resultEng.pronunciation.all}</p>
      <p><strong>Syllables:</strong> {resultEng.syllables.list.join("-")} ({resultEng.syllables.count})</p>
      <p><strong>Frequency:</strong> {resultEng.frequency}</p>

      <h3>English Definitions</h3>
      {resultEng.results.map((result, index) => (
        <div key={index} className="word-result">
          <p><strong>Definition:</strong> {result.definition}</p>
          <p><strong>Part of Speech:</strong> {result.partOfSpeech}</p>
          {result.synonyms && (
            <p><strong>Synonyms:</strong> {result.synonyms.join(", ")}</p>
          )}
          {result.hasTypes && (
            <p><strong>Types:</strong> {result.hasTypes.join(", ")}</p>
          )}
          {result.derivation && (
            <p><strong>Derivations:</strong> {result.derivation.join(", ")}</p>
          )}
        </div>
      ))}

      <h3>Uzbek Translation</h3>
      <p><strong>Word:</strong> {resultUz.word}</p>
      {resultUz.translations.map((translation, index) => (
        <div key={index} className="word-result">
          <p><strong>Definition:</strong> {translation.definition}</p>
          <p><strong>Part of Speech:</strong> {translation.partOfSpeech}</p>
          {translation.synonyms && (
            <p><strong>Synonyms:</strong> {translation.synonyms.join(", ")}</p>
          )}
          {translation.examples && translation.examples.length > 0 && (
            <p><strong>Examples:</strong> {translation.examples.join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  );
};