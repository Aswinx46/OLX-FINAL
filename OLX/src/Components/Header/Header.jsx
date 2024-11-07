import React, { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Context';
function Header() {
  const {user,setUser} =useContext(AuthContext)
  const navigate=useNavigate()

  function signout(){
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('signOut')
      setUser(null)
      navigate('/Signup')

    }).catch((error) => {
        console.log(error)
    });

  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span> {user? user.displayName:<Link to={'/login'}>LOGIN</Link>}</span>
          <hr />
        </div>
          <span>{user && <button onClick={signout}>LOGOUT</button>}</span>

        <div className="sellMenu" onClick={()=>navigate('/create')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
