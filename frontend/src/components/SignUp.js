import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    // console.log()
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
