import React from "react";
import "./WordDetails.css";

interface WordDetailsProps {
    wordData: {
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
    };
}

export const WordDetails: React.FC<WordDetailsProps> = ({ wordData }) => {
    const { resultEng, resultUz } = wordData;

    return (
        <div className="word-details">
            <div className="word-header">
                <h1>{resultEng.word}</h1>
                <button className="bookmark-icon">🔖</button>
            </div>
            <p className="pronunciation">[{resultEng.pronunciation.all}]</p>
            <div className="definitions">
                {resultEng.results.map((result, index) => (
                    <div key={index} className="definition">
                        <p><strong>{result.partOfSpeech}</strong>: {result.definition}</p>
                        {result.synonyms && (
                            <p><strong>Synonyms:</strong> {result.synonyms.join(", ")}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="translations">
                <h2>Translations</h2>
                {resultUz.translations.map((translation, index) => (
                    <div key={index} className="translation">
                        <p><strong>{translation.partOfSpeech}</strong>: {translation.definition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};