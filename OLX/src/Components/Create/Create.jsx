import React, { createContext, Fragment , useContext , useState} from 'react';
import './Create.css';
import { collection, addDoc ,setDoc, doc } from "firebase/firestore";
import Header from '../Header/Header';
import {AuthContext} from '../../store/Context'
import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";
import {db} from '../../firebase/config'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';





export const Create = () => {
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [imageurl,setImageUrl]=useState('')
  const {user} = useContext(AuthContext)
  const date=new Date().toLocaleDateString()
  const storage = getStorage();
  const navigate=useNavigate()


  

  const handleSubmit=async()=>{

    if(!image) return

    const formdata=new FormData()
    formdata.append('file',image);
    formdata.append('upload_preset','products')
    formdata.append('cloud_name','dotlezt0x')
    try {
      const response=await axios.post("https://api.cloudinary.com/v1_1/dotlezt0x/image/upload",formdata);
        setImageUrl(response.data.secure_url);
      // let userData = {
      //   url: imageurl,
      //   name,
      //   category,
      //   price,
      //   date,
      //   user:user.uid  // Optional, for convenience
      // }
      // console.log(response)
      console.log(response.data.secure_url)
      await addDoc(collection(db, 'products'),  {
        url: response.data.secure_url,
        name,
        category,
        price,
        date,
        user:user.uid  // Optional, for convenience
      }
      );
      navigate('/')
      // console.log(response)
    } catch (error) {
      console.log(error)
      alert('failed to upload the image to the cloud')
    }


  }
  return (
    <Fragment>
      <Header />
      {/* <card> */}
        <div className="centerDiv">
      <div className='create'>
        <h1 className='main-heading'>CREATE AN AD</h1>
      </div>
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
              // defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              // defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"   onChange={(e)=>setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          <form>
            <br />
            <input   onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button type='button' onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>  
      {/* </card> */}
    </Fragment>
  );
};

export default Create;
