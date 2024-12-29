import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./register.css";

export default function Register() {
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        username: userRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE" });
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="registerButton" type="submit" disabled={isFetching}>
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
