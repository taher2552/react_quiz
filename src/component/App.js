import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import Finished from "./Finished.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";

const SECS_PER_QUESTION =10;

const initialState = {
  questions: [],
  status: "loading", //loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore:0,
  secondsRemaining:null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieve":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "isStart":
      return { ...state, status: "active", secondsRemaining: state.questions.length* SECS_PER_QUESTION};

    case "isAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
            
            
      };

      case "nextQuestion":
        return {...state, index:state.index+1, answer: null  }

      case "finish":
        return {...state, status: "finish", highscore: state.points > state.highscore ? state.points : state.highscore }


        case "restart":
          return {...state,
            status: "ready", 
            index: 0,
            answer: null,
            points: 0,
            secondsRemaining:null
            }

        case "tick":
          return {...state, secondsRemaining: state.secondsRemaining-1, status: state.secondsRemaining===0 ? "finish" : state.status }

    default:
      throw new Error("invalid action");
  }
};

function App() {
  const [{ status, questions, index, answer,points, highscore, secondsRemaining}, dispatch] = useReducer(
    reducer,
    initialState
  );

  const totalQuestion = questions.length;
  const totalPoints = questions.reduce((pre, question)=>pre+question.points,0);

  // useEffect(() => {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataRecieve", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed" }));
  // }, []);

  useEffect(() => {
    fetch("https://taher2552.github.io/quiz_data/quiz_questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieve", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalQuestion={totalQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress index={index} totalQuestion={totalQuestion} points={points} totalPoints={totalPoints} answer={answer}/>
          <Question
            Questions={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
          <Timer dispatch={dispatch}  secondsRemaining={secondsRemaining}/>
          <NextButton dispatch={dispatch} answer={answer} index={index} totalQuestion={totalQuestion}  />
          </Footer>
         

          </>

        )}

        {
          status==="finish" &&(
            <Finished points={points} totalPoints={totalPoints} highscore={highscore} dispatch={dispatch} />
          )
        }
      </Main>
    </div>
  );
}

export default App;
