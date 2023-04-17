import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch } from "react-redux";
import { login } from "../reducers/usersSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  
  const handleClick = (e) => {
    e.preventDefault();
    
    dispatch(login({ username, password }))
  }
  
  const goHome = (e) => {
    e.preventDefault();
    navigate("/")
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
              <form>
                  
          <h1>Sign In</h1>
                  
          <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="loginButton" onClick={handleClick}>Sign In</button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
        <button className="goHome" onClick={goHome}>home</button>
      </div>
    </div>
  );
}