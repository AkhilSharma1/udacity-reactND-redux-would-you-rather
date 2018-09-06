import { RECEIVE_QUESTIONS, ADD_QUESTION } from "../actions/questions";

export function questions(state = null, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      const { question } = action;
      console.log(question)

      return {
        ...state,
        [question.id]:question
      };

    default:
      return state;
  }
}
