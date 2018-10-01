import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function handleAddQuestion(author, optionOneText, optionTwoText) {
  return (dispatch) => {

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

export function handleAddAnsweredQuestion(authedUser, qid, answer){
  const info = {
    authedUser,
    qid,
    answer
  };
  return (dispatch) => {
    dispatch(showLoading);
    return saveQuestionAnswer(info)
      .then(() => dispatch(addQuestionAnswer(info)))
      .then(() => dispatch(hideLoading));
  };
}

function addQuestionAnswer(info){
  return {
    type: ADD_QUESTION_ANSWER,
    info
  }
}

function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
  }
}
