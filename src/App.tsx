import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import NFTList from "./pages/NftList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/nft" element={<NFTList />} />
      </Routes>
    </>
  );
}

export default App;
