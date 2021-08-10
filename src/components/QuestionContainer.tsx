import React, { useState, useContext } from "react";
import axios from "axios";

import Question from "./Question";
import Options from "./Options";
import Loader from "./Loader";
import constants from "../constants/constants";
import { GlobalContext } from "../context/GlobalState";
import { setCurrentQuestion, setQuestions } from "../context/actionCreators";
import shuffle from "../utils/shuffle-array";

const QuestionContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const {
    state: { answers, questions, currentQuestion, score },
    dispatch,
  } = useContext(GlobalContext);

  const startQuizHandler = () => {
    setIsLoading(true);
    axios
      .get(constants.api)
      .then((res) => {
        setIsLoading(false);
        setIsStarted(true);
        dispatch(setQuestions(res.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showNextHandler = () => {
    dispatch(setCurrentQuestion(currentQuestion + 1));
  };

  return (
    <div className="QuestionContainer">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isStarted && questions.length > 0 ? (
            <>
              {currentQuestion < questions.length ? (
                <>
                  <Question
                    qStatement={questions[currentQuestion].question}
                    questionNo={currentQuestion}
                  />

                  <Options
                    options={shuffle(
                      questions[currentQuestion].incorrect_answers.concat(
                        questions[currentQuestion].correct_answer
                      )
                    )}
                    questionNo={currentQuestion}
                  />
                  <div className="BtnNextContainer">
                    {answers[currentQuestion] && (
                      <button className="Btn Next" onClick={showNextHandler}>
                        Next <span className="Arrow">→</span>
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="ScoreContainer">
                  <div className="Score">Score: {score}</div>
                  <div className="FeedBack">
                    {score <= 7 ? "Work Hard Next Time 😊" : "Good Work 😀"}
                  </div>
                  <button
                    className="Btn StartQuiz"
                    style={{ fontSize: "1.75rem", marginTop: "2rem" }}
                    onClick={startQuizHandler}
                  >
                    Start Again
                  </button>
                </div>
              )}
            </>
          ) : (
            <button className="Btn StartQuiz" onClick={startQuizHandler}>
              Start Quiz
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionContainer;
