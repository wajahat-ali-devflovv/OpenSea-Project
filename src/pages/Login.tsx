import React from "react";
import Button from "@mui/material/Button";
import InputField from "../components/InputField";

const Login = () => {
  return (
    <div className="w-[100%] h-screen flex items-center justify-center bg-gradient-to-br from-[#101011] to-[#1b1d1f]">
      {/* Glassmorphic Card */}
      <div
        className="w-[40%] flex flex-col items-center text-[24px] 
        bg-white/10 backdrop-blur-md shadow-xl
        border border-white/20 rounded-2xl p-10"
      >
        <h2 className="self-center text-[38px] font-[600] text-white">Login</h2>

        <form className="w-[80%]" action="">
          <label className="text-white">Email:</label>
          <InputField inputType="text" />

          <label className="text-white mt-4 block">Password:</label>
          <InputField inputType="password" />

          <div className="w-[100%] flex justify-center p-[5px]">
            <Button size="medium">Login</Button>
          </div>
        </form>

        <Button variant="">signUp</Button>
      </div>
    </div>
  );
};

export default Login;
