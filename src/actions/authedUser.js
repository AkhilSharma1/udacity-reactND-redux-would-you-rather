export const SET_AUTHED_USER = "SET_AUTHED_USER";
import { SET_AUTHED_USER } from './authedUser';

export function setAuthedUser(id){
    return {
        type: SET_AUTHED_USER,
        id,
    }
}