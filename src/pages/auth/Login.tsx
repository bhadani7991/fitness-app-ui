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
import { validateLoginRequest } from "../../utils/validation";

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-lg rounded-lg bg-white">
        <CardContent>
          <h1 className="font-bold text-3xl text-center mb-6 text-gray-800">
            Log In
          </h1>
          <h3 className="text-center mb-6 text-gray-800">
            Don't have an account?{" "}
            <span className="font-bold cursor-pointer underline">Sign Up</span>
          </h3>
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
            onClick={handleLoginRequest}
            fullWidth
          >
            Sign In
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default Login;
