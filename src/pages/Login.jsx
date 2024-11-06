import React from "react";

function Login() {
  const [currentState, setCurrentState] = React.useState("Sign Up");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
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
          required
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-800 font-yantramanav rounded-md"
        />
      )}
      <input
        required
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-800 font-yantramanav rounded-md"
      />
      <input
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
            className="font-imprima"
          >
            Create Account
          </p>
        ) : (
          <p className="font-imprima" onClick={() => setCurrentState("Login")}>
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
