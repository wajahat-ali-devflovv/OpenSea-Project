import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import NFTList from "./pages/NftList";
import AddCollection from "./pages/Addcollection";
import Sidebar from "./pages/Sidebar";

function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/signup"];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);
  return (
    <>
      {shouldShowSidebar && <Sidebar />}
      <div
        className={
          shouldShowSidebar ? "ml-20 md:ml-56 transition-all duration-200" : ""
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/nft" element={<NFTList />} />
          <Route
            path="/nfts/collections/:collectionId/nfts"
            element={<NFTList />}
          />
          <Route path="/add-collection" element={<AddCollection />} />{" "}
          {/* admin only */}
        </Routes>
      </div>
    </>
  );
}

export default App;
