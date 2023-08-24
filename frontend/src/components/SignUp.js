import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    let result = await fetch("http://localhost:3300/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>
      <input
        type={"text"}
        value={name}
        className={"inputBox"}
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type={"text"}
        value={email}
        className={"inputBox"}
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={"password"}
        value={password}
        className={"inputBox"}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signup" type="button" onClick={onSubmit}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
