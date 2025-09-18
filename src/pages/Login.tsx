import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
// import InputField from "../components/InputField";
import { useState } from "react";
import type { RootState } from "../store/store";
import { loginRequest } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignin = () => {
    dispatch(loginRequest(email, password));
    if (!loading && !error) {
      navigate("/");
    }
  };
  return (
    <div className="w-[100%] h-screen flex items-center justify-center bg-gradient-to-br from-[#101011] to-[#1b1d1f] ">
      {/* Glassmorphic Card */}
      <div
        className="w-[40%] flex flex-col items-center text-[24px] 
        bg-white/10 backdrop-blur-md shadow-xl
        border border-white/20 rounded-2xl p-10"
      >
        <h2 className="self-center text-[38px] font-[600] text-white">Login</h2>

        <form className="w-[80%]" action="">
          <label className="text-white">Email:</label>
          <TextField
            type="text"
            id="standard-basic"
            label="Standard"
            variant="standard"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <label className="text-white mt-4 block">Password:</label>
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <div className="w-[100%] flex justify-center p-[5px]">
            <Button
              variant="outlined"
              disabled={loading}
              onClick={handleSignin}
              size="medium"
            >
              Login
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {user && (
              <p className="text-green-500">
                Sign In successful! Welcome,{user.username}
              </p>
            )}
          </div>
        </form>

        <Button
          variant="outlined"
          size="medium"
          onClick={() => navigate("/signup")}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
};

export default Login;
