import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { setCurrentAnswer } from "../context/actionCreators";

import { GlobalContext } from "../context/GlobalState";

interface Props {
  statement: string;
  partNo: string;
}

const Option: React.FC<Props> = ({ statement, partNo }) => {
  const [classState, setClassState] = useState<string>("");

  const {
    state: { questions, currentQuestion, answers },
    dispatch,
  } = useContext(GlobalContext);

  const optionClickHandler = (chosenAnswer: string, questionNumber: number) => {
    dispatch(setCurrentAnswer(chosenAnswer, questionNumber));
  };

  useEffect(() => {
    if (answers[currentQuestion]) {
      if (
        answers[currentQuestion] === questions[currentQuestion].correct_answer
      ) {
        if (statement === answers[currentQuestion])
          setClassState("Green Disabled");
        else setClassState("Disabled");
      } else if (statement === questions[currentQuestion].correct_answer) {
        setClassState("Green Disabled");
      } else {
        if (statement === answers[currentQuestion])
          setClassState("Red Disabled");
        else setClassState("Disabled");
      }
    }
  }, [answers, currentQuestion, questions, statement]);

  useEffect(() => {
    setClassState("");
  }, [currentQuestion]);

  return (
    <div
      className={`Option ${classState}`}
      onClick={() => optionClickHandler(statement, currentQuestion)}
    >
      <div dangerouslySetInnerHTML={{ __html: statement }}></div>
      <div className="PartNo">{partNo}</div>
    </div>
  );
};

export default Option;
