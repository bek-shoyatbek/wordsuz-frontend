import React from "react";
import "./Examples.css";

interface ExamplesProps {
  examples: string[];
}

export const Examples: React.FC<ExamplesProps> = ({ examples }) => {
  console.log("examples: ", examples);
  return (
    <div className="examples">
      <h3 className="examples-title">Examples</h3>
      {examples.length > 0 ? (
        <ul className="examples-list">
          {examples.map((example, index) => (
            <li key={index} className="example-item">
              {example}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-examples">No examples available.</p>
      )}
    </div>
  );
};
