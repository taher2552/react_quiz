import React from "react";
import { Option } from "./Option";

export default function Question({ Questions, dispatch, answer}) {
  return (
    <div>
      <h1>Questions</h1>
      {
        <>
          <h3>{Questions.question}</h3>
          <Option Questions={Questions} dispatch={dispatch} answer={answer}  />
        </>
      }
    </div>
  );
}
