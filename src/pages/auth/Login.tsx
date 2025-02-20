import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginServiceAgent } from "../../services/loginService";
import { addUser } from "../../utils/userSlice";
import getAxiosError from "../../utils/axiosError";
import { toast } from "react-toastify";
import {
  validateLoginRequest,
  validateSignupRequest,
} from "../../utils/validation";

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginRequest = async () => {
    try {
      validateLoginRequest(email, password);
      const response = await loginServiceAgent.login({
        email,
        password,
      });
      dispatch(addUser(response.entity));
      //localStorage for handling the refersh case
      localStorage.setItem("user", JSON.stringify(response.entity));
      return navigate("/");
    } catch (error: any) {
      const appError = getAxiosError(error);
      toast.info(appError.errorMessage, { toastId: "loginError" });
    } finally {
      //clean up logic
    }
  };
  const handleSignUpRequest = async () => {
    console.log("called");
    try {
      validateSignupRequest(email, password, name, age, weight);
      const response = await loginServiceAgent.signUp({
        email,
        password,
        name,
        age,
        weight,
      });
      dispatch(addUser(response.entity));
      //localStorage for handling the refersh case
      localStorage.setItem("user", JSON.stringify(response.entity));
      return navigate("/");
    } catch (error: any) {
      const appError = getAxiosError(error);
      toast.info(appError.errorMessage, { toastId: "loginError" });
    } finally {
      //clean up logic
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-lg rounded-lg bg-white">
        <CardContent>
          <h1 className="font-bold text-3xl text-center mb-6 text-gray-800">
            {isLoginPage ? " Log In" : "Sign Up"}
          </h1>
          <h3
            onClick={() => setIsLoginPage(!isLoginPage)}
            className="text-center mb-6 text-gray-800 font-bold cursor-pointer "
          >
            {isLoginPage
              ? "Don't have an account? Sign Up"
              : "Existing User, Login Here"}
          </h3>
          {!isLoginPage && (
            <>
              <div className="mb-4">
                <TextField
                  fullWidth
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  variant="outlined"
                />
              </div>
              <div className="mb-6">
                <TextField
                  fullWidth
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  id="weight"
                  label="Weight"
                  type="number"
                  variant="outlined"
                />
              </div>
              <div className="mb-6">
                <TextField
                  fullWidth
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  id="age"
                  label="Age"
                  type="number"
                  variant="outlined"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <TextField
              fullWidth
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="mb-6">
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              label="Password"
              type="password"
              variant="outlined"
            />
          </div>
        </CardContent>
        <CardActions className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              isLoginPage ? handleLoginRequest() : handleSignUpRequest()
            }
            fullWidth
          >
            {isLoginPage ? "Log In" : "Sign Up"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default Login;
