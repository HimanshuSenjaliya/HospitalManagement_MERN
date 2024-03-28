/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/login",{email , password , confirmPassword , role : "Patient"},{withCredentials : true , headers : {
        "Content-Type" : "application/json"
      }})
      toast.success(response.data.message)
      setIsAuthenticated(true)
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  if (isAuthenticated) {
    navigateTo("/");
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign in</h2>
      <p>Please Login To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ducimus?
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registerd?</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Register Now!!
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignContent: "center"}}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
