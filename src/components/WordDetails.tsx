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
            <p className="pronunciation">
                <span className="speaker-icon">🔊</span> [{resultEng.pronunciation.all}]
            </p>

            <div className="definitions">
                {resultEng.results.map((result, index) => (
                    <div key={index} className="definition">
                        <p>
                            <strong>{result.partOfSpeech} {getUzbekTranslation(result.partOfSpeech)}</strong>: {result.definition} 
                        </p>
                        {result.synonyms && (
                            <p>
                                <strong>Synonyms:</strong>{" "}
                                {result.synonyms.map((synonym, idx) => (
                                    <a key={idx} href={`/search?word=${ synonym }`} className="synonym-link">
                                        {synonym}
                                    </a>
                                ))}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="translations">
                <h2><strong>Translations</strong></h2>
                {resultUz.translations.map((translation, index) => (
                    <div key={index} className="translation">
                        <p>
                            <strong>{translation.partOfSpeech}</strong>: {translation.definition}
                        </p>
                        {translation.synonyms && translation.synonyms.length > 0 && (
                            <p>
                                <strong>Synonyms:</strong> {translation.synonyms.join(", ")}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Function to get Uzbek translation for part of speech
const getUzbekTranslation = (partOfSpeech: string) => {
    const translations: { [key: string]: string } = {
        noun: "ot",
        verb: "fe'l",
        adjective: "sifat",
        adverb: "ravish",
        pronoun: "olmosh",
        preposition: "predlog",
        conjunction: "bog'lovchi",
        interjection: "undov",
    };
    return translations[partOfSpeech] || "";
};
