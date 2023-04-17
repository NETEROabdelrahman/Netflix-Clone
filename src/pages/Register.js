import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers,signUp } from "../reducers/usersSlice";
import "./register.scss";

export default function Register() {
  const users = useSelector(store => store.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])
  
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [change, setChange] = useState(false);


  
  const handleFinish = (e) => {
    e.preventDefault()
    dispatch(signUp( {username,password,email} )).unwrap()
  };
  
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to='/login' className="loginButton">Sign In</Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!change ? (
          <div className="input">
            <input type="email" placeholder="email address" onChange={(e)=>setEmail(e.target.value)} />
            <button className="registerButton" onClick={()=>setChange(!change)}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}