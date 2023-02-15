import {STATES} from "./Auth_Types";
import AuthService from "../../Services/AuthService"

export const signIn = (username, password) => (dispatch) => {
    return AuthService.signIn(username, password).then(
        (data) => {
            dispatch({
                type: STATES.LOGIN_SUCCESS,
                payload: {user: data},
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: STATES.LOGIN_FAIL,
            });

            dispatch({
                type: STATES.SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        });
}


export const signOut = () => (dispatch) => {
    AuthService.signOut();
    dispatch({
        type: STATES.SIGN_OUT
    })
}
