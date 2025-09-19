//import React,{useState,useEffect} from "react"
//import Button from "../components/Button";
//import InputField from "../components/InputField";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../store/actions/authActions";
import type { RootState } from "../store/store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupSchema } from "../validations/validation";

const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, user, token } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="w-[100%] text-white h-screen flex items-center justify-center bg-[url(https://wallpapercave.com/wp/wp8616957.jpg)] ">
      <div
        className="w-[40%] flex flex-col items-center text-[24px] 
        bg-white/10 backdrop-blur-md shadow-xl
        border border-white/20 rounded-2xl p-10 "
      >
        <h2 className=" self-center text-[38px] font-[600]">Sign In</h2>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            dispatch(
              signupRequest(values.username, values.email, values.password)
            );
          }}
        >
          {({ handleChange, values, touched, errors }) => (
            <Form className="w-[80%]">
              {/* Username */}
              <label>Username</label>
              <TextField
                fullWidth
                variant="standard"
                name="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
              />

              {/* Email */}
              <label>Email</label>
              <TextField
                fullWidth
                variant="standard"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />

              {/* Password */}
              <label>Password</label>
              <TextField
                fullWidth
                variant="standard"
                type="password"
                name="password"
                sx={{ Color: "white", textColor: "white" }}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
              />

              <div className="w-[100%] flex justify-center p-[5px] mt-4">
                <Button
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                  type="submit"
                  disabled={loading}
                >
                  Sign Up
                </Button>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              {user && (
                <p className="text-green-500">
                  Signup successful! Welcome, {user.username}
                </p>
              )}
            </Form>
          )}
        </Formik>

        <Button
          variant="contained"
          size="medium"
          className="mt-4"
          sx={{ marginTop: 2 }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Signup;
