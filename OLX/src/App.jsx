import React, { useContext, useEffect } from 'react';
import './App.css';
import {BrowserRouter,Route,RouterProvider,Routes} from 'react-router-dom'
import Signup from './Pages/Signup'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from './store/PostContext'

import Home from './Pages/Home';
import Login from './Components/Login/Login'
import {AuthContext} from './store/Context'
import Create from'./Pages/Create'
import View from './Components/View/View';
function App() {
  const {user,setUser}=useContext(AuthContext)

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user)
        console.log('LOGGED IN THE USER')
      } else {
        // User is signed out
        // ...
      }
    });
  })
  return (
    <Post>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/view' element={<View/>} />
        </Routes>
      </BrowserRouter>
    </Post>
  
  );
}

export default App;
