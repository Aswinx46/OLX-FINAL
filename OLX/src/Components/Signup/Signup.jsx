import React, { useState, useContext } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite';
import Loading from '../Spinner/Spinner';



import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate=useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading,setIsLoading]=useState(false)
 
  const firebaseConfig = {
    apiKey: "AIzaSyCL5KQ59T8BPZRhucqAdMB0rgz1U0h3nkw",
    authDomain: "olxx-7b908.firebaseapp.com",
    projectId: "olxx-7b908",
    storageBucket: "olxx-7b908.appspot.com",
    messagingSenderId: "522736693103",
    appId: "1:522736693103:web:04687d77eaba5cd5aa029a",
    measurementId: "G-8P8SQ5L8NG"
  };



  



  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the registered user
      updateProfile(user,{displayName:username})
      console.log('User registered with UID:', user.uid);

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        phone: number,
        email: email,  // Optional, for convenience
      });
      navigate("/login")
   
    } catch (error) {
      console.error('Error during registration:', error);
      setIsLoading(false)
      alert(error.message);
    }
  };

  // }
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  

  return (
    <div>
      <div className="signupParentDiv">
        <h1 className='signupheading'>SIGNUP</h1>
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
         { isLoading && <Loading/>}
        </form>
        <Link  to='/login'>LOGIN</Link>
      </div>
    </div>
  );
}
