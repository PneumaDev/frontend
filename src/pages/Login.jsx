import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [currentState, setCurrentState] = React.useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);

  const handleJwtDecode = async (jwt) => {
    const token = jwtDecode(jwt);
    if (token.email_verified) {
      setName(token.name);
      setEmail(token.email);
      setIsGoogleAuthenticated(true);

      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
        isGoogleAuthenticated,
      });

      if (response.data.success === true) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        return response.data.message;
      } else {
        throw new Error(response.data.message);
      }
    }
  };

  const onSubmitHandler = async () => {
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success === true) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          return response.data.message;
        } else {
          throw new Error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
          isGoogleAuthenticated,
        });

        if (response.data.success === true) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          return response.data.message;
        } else {
          throw new Error(response.data.message);
        }
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error ||
          "An error occurred. Please try again!"
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleOnsubmitHandler = async (e) => {
    e.preventDefault();
    toast.promise(
      onSubmitHandler(),
      {
        loading:
          currentState === "Sign Up" ? "Signing Up..." : "Just A Moment!😊",
        success: (message) => message || "Successful!",
        error: (err) => err.message || "An error occurred",
      },
      {
        id: "login page",
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleOnsubmitHandler}
        action=""
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="font-imprima text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-800 font-yantramanav rounded-md"
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-800 font-yantramanav rounded-md"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-800 font-yantramanav rounded-md"
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="font-imprima cursor-pointer">Forgot your password?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="font-imprima cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              className="font-imprima cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login Here
            </p>
          )}
        </div>
        <button
          className="bg-black hover:shadow-lg text-white font-light px-8 py-2 mt-4"
          type="submit"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div className="flex flex-col justify-center items-center mt-3 space-y-2">
        <p className="for">or</p>
        <GoogleLogin
          theme="filled_blue"
          onSuccess={async (credentialResponse) => {
            await handleJwtDecode(credentialResponse.credential);
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          login_uri="/"
          useOneTap
        />
      </div>
    </div>
  );
}

export default Login;
