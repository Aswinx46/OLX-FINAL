import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import axios from 'axios';

import { collection, Firestore, getDocs, } from "firebase/firestore";
import { db } from '../../firebase/config';
import {postContext} from '../../store/PostContext'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
function View() {

  const {postDetails,setpostDetails}=useContext(postContext)

  const[userDetails,setUserDetails]=useState()
  
  useEffect(()=>{

    const fetchdata=async()=>{
      try {
        const docref=doc(db,'users',postDetails.user)
        const docsnap=await getDoc(docref)
        if(docsnap.exists())
        {
          setUserDetails(docsnap.data())
        }else{
          console.log('the document dosent exits')
        }
      } catch (error) {
        
      }
    }
    fetchdata()
    
    console.log(userDetails)
   
  },[])
  return (
    
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
        <div className="contactDetails">
          <p>{userDetails && userDetails.username}</p>
          <p></p>
          <p>{userDetails && userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
