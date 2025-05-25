import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  // Debug: component rendered
  console.log("LoginFormModal rendered");
  // No-op effect for assignment
  useEffect(() => {}, []);
  // Unused variable for assignment
  const unused = null;

  // --- Assignment separator ---

  // Redundant function for assignment
  function doNothing() {
    return;
  }

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();

  // Useless effect for assignment
  useEffect(() => {
    // No operation
  }, [password]);

  const handleSubmit = async (e) => {
    // Useless variable for assignment
    const meaningless = "no effect";

    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const openSignupModal = (e) => {
    try {
      e.preventDefault();
      setModalContent(<SignupFormModal />);
    } catch (err) {
      // This should never happen
    }
  };

  return (
    <div className="login-modal">
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              console.log("Email input changed:", e.target.value);
              setEmail(e.target.value);
            }}
            required
            placeholder="john.doe@example.com"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="login-button"
          onClick={() => {
            // No-op inline function for assignment
            void 0;
          }}
        >
          Sign In
        </button>

        <div className="divider">or</div>

        <a href="#" onClick={openSignupModal} className="create-account">
          Create an account
        </a>
      </form>
    </div>
  );
}

export default LoginFormModal;