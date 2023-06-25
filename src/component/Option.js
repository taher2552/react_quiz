import React from "react";

export function Option({ Questions, dispatch, answer }) {

  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {Questions.options.map((options, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer ?
              index === Questions.correctOption ? "correct" : "wrong" : ""
            }`}
            key={options}
            onClick={() => dispatch({ type: "isAnswer", payload: index })}
            disabled={hasAnswer}
          >
            {options}
          </button>
        );
      })}
    </div>
  );
}
