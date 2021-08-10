import { MCQ, Action, ActionType } from "./actionCreators";

export interface State {
  questions: MCQ[] | [];
  score: number;
  currentQuestion: number;
  answers: string[];
}

export const initialState: State = {
  questions: [],
  score: 0,
  currentQuestion: 0,
  answers: [],
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_QUESTIONS:
      return { ...state, ...initialState, questions: action.payload };
    case ActionType.SET_CURRENT_QUESTION:
      return { ...state, currentQuestion: action.payload };
    case ActionType.SET_CURRENT_ANSWER:
      const { currentQuestionNumber } = action.payload;
      const newAnswers = [...state.answers];
      let newScore = state.score;
      if (newAnswers[currentQuestionNumber]) {
        return state;
      }
      newAnswers[currentQuestionNumber] = action.payload.answer;
      if (
        newAnswers[currentQuestionNumber] ===
        state.questions[currentQuestionNumber].correct_answer
      ) {
        newScore += 1;
      }
      return { ...state, answers: [...newAnswers], score: newScore };
    case ActionType.SET_SCORE:
      return { ...state, score: action.payload };
    default:
      return state;
  }
};

export default reducer;
