export const RECEIVE_USERS = "RECEIVE_USERS"
import { RECEIVE_USERS } from './users';

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users        
    }
}