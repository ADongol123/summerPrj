import React, { useState,useEffect } from 'react'
import "./Login.css"
import Button from "@material-ui/core/Button"
import {auth, provider} from "./firebase"
import {selectUserName,
    selectUserPhoto,
    setuserLogin,
    setSignout
} from "./features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"


import {useHistory} from "react-router-dom"

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto= useSelector(selectUserPhoto);
    console.log(userName)
    useEffect(()=>{
     auth.onAuthStateChanged(async(user)=>{
         if(user){
            dispatch(setuserLogin({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL,
            }))
            
         }
     })
    },[])
    const signin = () =>{
        auth.signInWithPopup(provider).
        then((result)=>{
            let user= result.user;
            dispatch(setuserLogin({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL,
            }))
            
     })
 }

    return (
        <div className='login'>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <img
                        src="/img/logo.png" alt=""/>
                    </div>
                    <div className="navbar_info">
                    <h2>Notechat</h2>
                    
                    <Button type="submit" onClick={signin}>
                        Sign In </Button>
                        
                    </div>
                </div>
          </nav> 
          <div className="main_body">
                <div className="body_left">
                    <h3>"Communication works for<br/> those who work at it" </h3>
                </div>
                <div className="body_right">
                    <img src="/img/img.png" />
                </div>

          </div>
        </div>
    )
}

export default Login
