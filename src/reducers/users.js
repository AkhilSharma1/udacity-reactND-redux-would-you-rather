import { RECEIVE_USERS } from '../actions/users';
import { ADD_QUESTION_ANSWER } from '../actions/questions';

export function users(state = null, action){
    switch(action.type){
        case RECEIVE_USERS:
        return {
            ...state,
            ...action.users
        }

        case ADD_QUESTION_ANSWER:
      const { authedUser, qid, answer } = action.info;
      const  users  = state;
        return  {
              ...users,
              [authedUser]: {
                ...users[authedUser],
                answers: {
                  ...users[authedUser].answers,
                  [qid]: answer
                }
              }
            };        
        default:
        return state;
    }
}
