import AdminService from "../../../Services/AdminService";
import {STATES} from "./AuthAction";
import UserService from "../../../Services/UserService";

export const USERSTATE = {
  REMOVE_USER: "REMOVE_USER",
  REMOVE_USER_FAIL: "REMOVE_USER_FAIL",
  ADD_USER: "ADD_USER",
  ADD_USER_FAIL: "ADD_USER_FAIL",
  SET_MESSAGE: "SET_MESSAGE",
  GET_ALL_USER: "GET_ALL_USER",
  GET_ALL_USER_FAIL: "GET_ALL_USER_FAIL",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",
};


export const getAllUsers = () => (dispatch) => {
  return AdminService.getAllUsers().then(
    (data) => {
      const jsonResp = JSON.stringify(data.data)

      dispatch({
        type: USERSTATE.GET_ALL_USER,
        payload: {users: jsonResp}
      });
      return jsonResp;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.GET_ALL_USER_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const addUser = (userEmail, password,firstname,lastname) => (dispatch) => {
  console.log("**" + userEmail +  password+ firstname+ lastname);
  return AdminService.addUser(userEmail, password, firstname, lastname).then(
    (response) => {
      dispatch({
        type: USERSTATE.ADD_USER,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
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
        type: USERSTATE.ADD_USER_FAIL,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const removeUser = (removeUser) => (dispatch) => {
  return AdminService.removeUser(removeUser).then(
    (data) => {
      dispatch({
        type: USERSTATE.REMOVE_USER,
        payload: {users: data}
      });
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.REMOVE_USER_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return error.response;
    }
  );
}

export const updateUser = (editUser) => (dispatch) => {
  return AdminService.updateUser(editUser).then(
    (data) => {
      dispatch({
        type: USERSTATE.UPDATE_USER,
        payload: {users: data}
      });
      return data;
    },
    (error) => {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.UPDATE_USER_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return error.response;
    }
  );
}