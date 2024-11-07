import React,{useContext, useEffect,useState} from 'react';

import Heart from '../../assets/Heart';
import { collection, getDocs, } from "firebase/firestore";
import { db } from '../../firebase/config';
import './Post.css';

import {postContext} from '../../store/PostContext'
import { useNavigate } from 'react-router-dom';

function Posts() {

  const {setpostDetails}=useContext(postContext)
  const[product,setProduct]=useState([])
  const productsarray=[]
  const navigate=useNavigate()
    useEffect(()=>{
      const datafetch=async()=>{
        try {
          const querySnapshot = await getDocs(collection(db, "products"));
          querySnapshot.forEach((doc) => {
            productsarray.push({id:doc.id, ...doc.data()})
            // console.log(doc.id, " => ", doc.data());
          });
          setProduct(productsarray)
          console.log(productsarray)
        } catch (error) {
          console.log(error)
        }
      }
      datafetch()
    },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        {
          product.map(product=>{
           
            
         return (
           
          <div
           className="card" key={product.id}
           onClick={()=>{
            setpostDetails(product)
            navigate('/view')
           }}
         >
           <div className="favorite">
             <Heart></Heart>
           </div>
           <div className="image">
             <img src={product.url} alt="" />
           </div>
           <div className="content">
             <p className="rate">&#x20B9; {product.price}</p>
             <span className="kilometer">{product.category}</span>
             <p className="name"> {product.name}</p>
           </div>
           <div className="date">
             <span>{product.date}</span>
           </div>
         </div>
    ) 
          })
        }
        <div className="cards">
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
