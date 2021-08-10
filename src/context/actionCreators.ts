export enum ActionType {
  SET_QUESTIONS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_SCORE,
}

export interface Action {
  type: ActionType;
  payload: any;
}

export interface MCQ {
  question: string;
  correct_answer: "string";
  incorrect_answers: string[];
}

export const setQuestions = (questions: MCQ[]): Action => {
  return { type: ActionType.SET_QUESTIONS, payload: questions };
};

export const setCurrentQuestion = (no: number): Action => {
  return { type: ActionType.SET_CURRENT_QUESTION, payload: no };
};

export const setCurrentAnswer = (
  answer: string,
  currentQuestionNumber: number
): Action => {
  return {
    type: ActionType.SET_CURRENT_ANSWER,
    payload: { answer, currentQuestionNumber },
  };
};

export const setScore = (score: number): Action => {
  return { type: ActionType.SET_SCORE, payload: score };
};
