"use client";
import { reducerCases } from "./constants";

export const initialState = {
  showLoginModal: false,
  showSignupModal: false,
  userInfo: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.showLoginModal,
        showSignupModal: false,
      };
    case reducerCases.TOGGLE_SIGNUP_MODAL:
      return {
        ...state,
        showSignupModal: action.showSignupModal,
        showLoginModal: false,
      };
    case reducerCases.CLOSE_LOGIN_SIGNUP_MODAL:
      return {
        ...state,
        showSignupModal: false,
        showLoginModal: false,
      };
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default reducer;
