"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";

import { useStateProvider } from "@/context/StateContext";

import { reducerCases } from "@/context/constants";
import axios from "axios";

import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/ServerRoutes";

export default function AuthModal({ type }) {
  const { state, dispatch } = useStateProvider();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  // console.log(process.env.SERVER_URL);

  if (!state.showLoginModal && !state.showSignupModal) {
    return;
  }

  const handleInput = (e) => {
    e.preventDefault();
    if (state.showLoginModal) {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    } else {
      setSignupData({
        ...signupData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.showLoginModal) {
      if (loginData.username.length && loginData.password.length) {
        // here
        try {
          const response = await axios.post(LOGIN_ROUTE, loginData, {
            withCredentials: true,
          });
          if (response) {
            dispatch({ type: reducerCases.SET_USER_INFO, userInfo: response });
            dispatch({ type: reducerCases.CLOSE_LOGIN_SIGNUP_MODAL });
          }
        } catch (error) {
          console.log(error);
          if (error.response.data.error) {
            alert(error.response.data.error);
          } else {
            alert("Connection problem");
          }
        }
      } else {
        alert("Fillout form details");
      }
    } else {
      if (
        signupData.fullName.length &&
        signupData.username.length &&
        signupData.email.length &&
        signupData.password.length
      ) {
        // here
        try {
          const response = await axios.post(SIGNUP_ROUTE, signupData, {
            withCredentials: true,
          });
          if (response.data?.user?.id) {
            dispatch({ type: reducerCases.SET_USER_INFO, userInfo: response });
            dispatch({ type: reducerCases.CLOSE_LOGIN_SIGNUP_MODAL });
          }
        } catch (error) {
          console.log(error);
          if (error.response.data.error) {
            alert(error.response.data.error);
          } else {
            alert("Connection problem");
          }
        }
      } else {
        alert("Fillout form details");
      }
    }
  };

  return (
    <div className="fixed top-0 z-[100] auth-modal">
      <div
        className="h-[100vh] w-[100vw] backdrop-filter-md fixed top-0 blur"
        id="blur-div"
        onClick={() =>
          dispatch({ type: reducerCases.CLOSE_LOGIN_SIGNUP_MODAL })
        }
      ></div>

      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div
          className="fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center"
          id="auth-modal"
        >
          {state.showLoginModal && (
            <div className="flex flex-col justify-center items-center p-8 gap-7">
              <h3 className="text-3xl font-semibold text-slate-500">Login</h3>

              <div className="flex flex-col gap-5">
                <button className="text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative">
                  <MdFacebook className="absolute left-4 text-2xl" />
                  Continue with Facebook
                </button>
                <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                  <FcGoogle className="absolute left-4 text-2xl" />
                  Continue with Google
                </button>
              </div>

              <div className="relative w-full text-center">
                <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%]">
                  <span className="bg-white relative z-10 px-2">OR</span>
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  className="border border-slate-300 w-80 p-3"
                  placeholder="Username"
                  name="username"
                  onChange={handleInput}
                />
                <input
                  type="password"
                  className="border border-slate-300 w-80 p-3"
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                />
                <button
                  onClick={handleSubmit}
                  className="bg-[#1D8F73] text-white text-lg font-semibold flex items-center justify-center p-3 w-80"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {state.showSignupModal && (
            <div className="flex flex-col justify-center items-center p-8 gap-7">
              <h3 className="text-3xl font-semibold text-slate-500">Signup</h3>

              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  className="border border-slate-300 w-80 p-3"
                  placeholder="Full name"
                  name="fullName"
                  onChange={handleInput}
                />
                <input
                  type="text"
                  className="border border-slate-300 w-80 p-3"
                  placeholder="Username"
                  name="username"
                  onChange={handleInput}
                />
                <input
                  type="email"
                  className="border border-slate-300 w-80 p-3"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                />
                <input
                  type="password"
                  className="border border-slate-300 w-80 p-3"
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                />
                <button
                  onClick={handleSubmit}
                  className="bg-[#1D8F73] text-white text-lg font-semibold flex items-center justify-center p-3 w-80"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center border-t border-r-slate-400 py-5 w-full">
            {state.showLoginModal && (
              <span className="text-sm text-slate-700">
                Not a member yet?{" "}
                <span
                  className="text-[#1D8F73] cursor-pointer"
                  onClick={() =>
                    dispatch({
                      type: reducerCases.TOGGLE_SIGNUP_MODAL,
                      showSignupModal: true,
                    })
                  }
                >
                  Join Now
                </span>
              </span>
            )}
            {state.showSignupModal && (
              <span className="text-sm text-slate-700">
                Already have account?{" "}
                <span
                  className="text-[#1D8F73] cursor-pointer"
                  onClick={() =>
                    dispatch({
                      type: reducerCases.TOGGLE_LOGIN_MODAL,
                      showLoginModal: true,
                    })
                  }
                >
                  Login
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
