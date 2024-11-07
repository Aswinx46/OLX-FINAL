import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

import Loading from '../Spinner/Spinner';
function Login() { 

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [isLoading,setIsLoading]=useState(false)
const navigate=useNavigate()



function handleSignIn(e)
{ 
  setIsLoading(true)
  e.preventDefault()

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
 
    navigate('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

  
}

  
  return (
    <div>
      <div className="loginParentDiv">
      <h1 className='loginHeading' >LOGIN</h1>
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSignIn}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
          { isLoading && <Loading/>}
        </form>
        <Link  to='/Signup'>SIGN UP</Link>
      </div>
    </div>
  );
}

export default Login;
