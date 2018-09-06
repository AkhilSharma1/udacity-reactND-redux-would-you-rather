import { saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function handleAddQuestion(author, optionOneText, optionTwoText) {
  return (dispatch, getState) => {

    dispatch(showLoading);
    return saveQuestion({
      author,
      optionOneText,
      optionTwoText
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading));
  };
}

function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
  }
}
