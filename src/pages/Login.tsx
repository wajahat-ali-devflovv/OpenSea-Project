import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../store/store";
import { loginRequest } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validations/validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user, token } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (user && token) {
      navigate("/"); // change "/landing" to your landing route
    }
  }, [user, token, navigate]);
  return (
    <div className="w-[100%] text-white h-screen flex items-center justify-center bg-[url(https://wallpapercave.com/wp/wp8616957.jpg)] ">
      {/* Glassmorphic Card */}
      <div
        className="lg:w-[40%] w-[75%] flex flex-col items-center text-[24px] 
        bg-white/10 backdrop-blur-md shadow-xl
        border border-white/20 rounded-2xl p-10 "
      >
        <h2 className="self-center text-[38px] font-[600] text-white">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            dispatch(loginRequest(values.email, values.password));
          }}
        >
          {({ handleChange, values }) => (
            <Form className="w-[80%]">
              <label>Email:</label>
              <Field
                as="input"
                type="text"
                name="email"
                onChange={handleChange}
                value={values.email}
                className="border-b w-full text-black"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 "
              />
              <label>Password :</label>
              <Field
                as="input"
                type="password"
                name="password"
                color="primary"
                onChange={handleChange}
                value={values.password}
                className="border-b w-full text-black"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500"
              />
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border rounded"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

              {error && <p className="text-red-500">{error}</p>}
            </Form>
          )}
        </Formik>
        <Button
          variant="contained"
          size="medium"
          sx={{ marginTop: 2 }}
          onClick={() => navigate("/signup")}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
};
export default Login;
