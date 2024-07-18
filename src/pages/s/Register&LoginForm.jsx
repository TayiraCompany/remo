import React, { useRef, useState } from "react";
import styles from "../../styles/s/Register&LoginForm.module.css";
import {
  CreateAccountMethod,
  CreateAccountValidator,
  LoginAccountMethod,
  useUser,
} from "../../services/server/account-stats";

export default function Register_loginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useUser();

  if (user.email) {
    window.location.href = "/";
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.toggle}>
            <button
              onClick={() => setIsLogin(true)}
              className={isLogin ? styles.active : ""}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={!isLogin ? styles.active : ""}
            >
              Register
            </button>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    );
  }
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageColor = useRef("red");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      LoginAccountMethod(email, password);
      errorMessageColor.current = "green";
      setErrorMessage("Account Login In");
      setTimeout(() => {
        
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <p style={{ color: errorMessageColor.current }}>{errorMessage}</p>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="loginEmail">Email:</label>
        <input
          type="email"
          id="loginEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </form>
  );
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const errorMessageColor = useRef("red");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = CreateAccountValidator(
      email,
      password,
      confirmPassword
    );
    if (validationError) {
      errorMessageColor.current = "red";
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage("");
    try {
      CreateAccountMethod(email, password, displayname);
      setSuccessMessage("¦|! Account Create Successfully !|¦");
      setTimeout(() => {
        window.location.href = "/";
        
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="javascript:void(0);">
      {errorMessage && (
        <p style={{ color: errorMessageColor.current }}>{errorMessage}</p>
      )}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="registerEmail">Email:</label>
        <input
          type="text"
          id="registerEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="registerDisplayname">Username:</label>
        <input
          type="text"
          id="registerDisplayname"
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="registerPassword">Password:</label>
        <input
          type="password"
          id="registerPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Register
      </button>
    </form>
  );
}
