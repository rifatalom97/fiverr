"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import FiverrLogo from "./home/FiverrLogo";
import { useStateProvider } from "@/context/StateContext";

import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { reducerCases } from "@/context/constants";
import axios from "axios";

import { GET_USER_INFO_ROUTE, LOGOUT_ROUTE } from "@/utils/ServerRoutes";

export default function Navbar() {
  const [cookies, setCookie] = useCookies(["fiverrJWTCookie"]);
  const router = useRouter();
  const [isFixed, setIsFixed] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { state, dispatch } = useStateProvider();
  useEffect(() => {
    if (isLoaded === false && cookies && cookies.fiverrJWTCookie) {
      const get_user_info = async () => {
        try {
          const response = await axios.post(GET_USER_INFO_ROUTE, null, {
            withCredentials: true,
          });
          if (response && response.data?.id) {
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: response.data,
            });
          } else {
            throw new Error("User not found");
          }
        } catch (response) {
          console.log(response);
          dispatch({ type: reducerCases.SET_USER_INFO, userInfo: null });

          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert("Connection problem");
          }
        }
      };
      get_user_info();
      setIsLoaded(true);
    } else {
      dispatch({ type: reducerCases.SET_USER_INFO, userInfo: null });
      setIsLoaded(true);
    }
  }, [isLoaded, setIsLoaded, cookies]);

  // scroll fixed
  useEffect(() => {
    if ((router.pathname = "/")) {
      const positionFixed = () => {
        window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
      };
      window.addEventListener("scroll", positionFixed);

      return () => window.removeEventListener("scroll", positionFixed);
    } else {
      setIsFixed(true);
    }
  }, [isFixed, setIsFixed]);

  const handleLogin = () => {
    dispatch({ type: reducerCases.TOGGLE_LOGIN_MODAL, showLoginModal: true });
  };
  const handleSignup = () => {
    dispatch({ type: reducerCases.TOGGLE_SIGNUP_MODAL, showSignupModal: true });
  };

  const links = [
    { label: "Fiverr Business", handler: "#", type: "link" },
    { label: "Explore", handler: "#", type: "link" },
    { label: "English", handler: "#", type: "link" },
    { label: "Become a seller", handler: "#", type: "link" },
    { label: "Sign in", handler: handleLogin, type: "button" },
    { label: "Join", handler: handleSignup, type: "button" },
  ];
  const handleLogout = async () => {
    try {
      const response = await axios.post(LOGOUT_ROUTE, null, {
        withCredentials: true,
      });
      if (response) {
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: null,
        });
      } else {
        throw new Error("User not found");
      }
    } catch (response) {
      console.log(response);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Connection problem");
      }
    }
  };
  const links2 = [
    { label: "Profile", handler: "profile", type: "link" },
    { label: "Logout", handler: handleLogout, type: "button" },
  ];

  return (
    <>
      {isLoaded ? (
        <div
          className={`flex flex-row justify-between items-center px-20 py-6 w-full top-0 z-30 transition-all duration-300 ${
            !isFixed
              ? "absolute border-transparent bg-transparent"
              : "fixed bg-white border border-b border-gray-200"
          }`}
        >
          <div>
            <Link href="/">
              <FiverrLogo fillColor={isFixed ? "#405145" : "#ffffff"} />
            </Link>
          </div>

          <div
            className={`search_box flex ${
              isFixed || state.userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              className="w-[20rem] border py-2.5 px-4 runded-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-gray-900 text-white align-center flex justify-center items-center"
              onClick={() => {
                setSearch("");
                router.push(`?search=${search}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>

          <ul
            className={`menu_lists flex flex-row justify-between items-center ${
              isFixed ? "text-gray" : "text-white"
            } gap-5 text-sm`}
          >
            {state.userInfo === null
              ? links.map(({ label, handler, type }) => {
                  if (type === "link") {
                    return (
                      <li key={label}>
                        <Link href={handler}>{label}</Link>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={label}
                        className="cursor-pointer"
                        onClick={handler}
                      >
                        {label}
                      </li>
                    );
                  }
                })
              : links2.map(({ label, handler, type }) => {
                  if (type === "link") {
                    return (
                      <li key={label}>
                        <Link href={handler}>{label}</Link>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={label}
                        className="cursor-pointer"
                        onClick={handler}
                      >
                        {label}
                      </li>
                    );
                  }
                })}
          </ul>
        </div>
      ) : undefined}
    </>
  );
}
