import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Navbar from "./components/NavBar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

import { setUser } from "./reducers/loggedUserReducer";

import userService from "./services/user";

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromStorage = userService.getUser();
    dispatch(setUser(userFromStorage));
  }, [dispatch]);

  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <div>
      <Navbar />

      <section className="section">
        <Routes>
          <Route path="/" element={loggedUser ? <Home /> : <LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
