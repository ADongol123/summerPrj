import React from 'react'
import './Header.css'
import {Avatar,Button,IconButton} from "@material-ui/core"
import HomeIcon from"@material-ui/icons/Home"
import { BrowserRouter as Router,Link } from 'react-router-dom'
import ChatIcon from "@material-ui/icons/Chat"
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
    setSignout
  } from "./features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"
import {auth, provider} from "./firebase"
import {useHistory} from "react-router-dom"

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const signout = () =>{
        auth.signOut()
        .then(()=>{
            dispatch(setSignout())
            history.push("/login")
        })
    }
    return (
        
        <div className='header'>
           <div className="header__left">
               <img src="/img/logo.png"/>
               <div className="header__input">
                    <p>notechat</p>   
               </div>
           </div>
           <div className="header__center">
               <div className="header__option
                header__option--active">
                 <Link to='/'> 
                    <HomeIcon fontSize="large"/>
                </Link>
                          
                </div>
               <div className="header__option
                header__option--activeSecond">
                    <Link to='/Application'> 
                     <ChatIcon fontSize="large"/>
                    </Link>
                 </div>
               <div className="header__option
               header__option--activeThird">
                    <Link to='/Profile'> 
                     <PersonIcon fontSize="large"/>
                    </Link>    
                </div>
                <div className="header__option">
                    <Link onClick={signout}> 
                    <ExitToAppIcon/>
                    </Link>    
                </div>
           </div>
         </div>
            
       
       
    )
}

export default Header



