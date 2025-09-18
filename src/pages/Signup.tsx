//import React,{useState,useEffect} from "react"
//import Button from "../components/Button";
//import InputField from "../components/InputField";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../store/actions/authActions";
import type { RootState } from "../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignup = () => {
    dispatch(signupRequest(username, email, password));
  };
  return (
    <div className="w-[100%] h-screen flex items-center justify-center bg-[#ffffff]">
      <div className="w-[40%] flex flex-col items-center text-[24px] ">
        <h2 className=" self-center text-[38px] font-[600]">Sign In</h2>
        <form className="w-[80%]" action="">
          <br />
          <label className="" htmlFor="">
            Name:
          </label>
          <br />
          <TextField
            type="text"
            id="standard-basic"
            label="Standard"
            variant="standard"
            placeholder="Email"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="">Email:</label>
          <br />
          <TextField
            type="text"
            id="standard-basic"
            label="Standard"
            variant="standard"
            placeholder="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="">Password:</label>
          <br />
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            type="password"
            placeholder="Password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="w-[100%] flex justify-center p-[5px]">
            <Button
              variant="outlined"
              disabled={loading}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {user && (
              <p className="text-green-500">
                Signup successful! Welcome,{user.username}
              </p>
            )}
          </div>
        </form>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};
export default Signup;
