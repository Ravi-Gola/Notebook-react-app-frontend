import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/note/noteState";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
         
          <Routes>
            <Route exact path="/" element={<Home key={"home"} />} />
            <Route exact path="about/" element={<About key={"about"} />} />
            <Route exact path="login/" element={<Login key={"login"} />} />
            <Route exact path="signup/" element={<SignUp key={"signup"} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
