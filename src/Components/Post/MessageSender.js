import React,{useState} from 'react' 
import "./Css/MessageSender.css"
import {Avatar} from "@material-ui/core"

import db from "../../firebase";
import firebase from "firebase"
import styled from "styled-components";
import {selectUserName,
    selectUserPhoto,
    
} from "../../features/user/userSlice"

import {useDispatch,useSelector} from "react-redux"
import PostModal from "./PostModal"
function MessageSender() {
    const[input,setInput]= useState("");
    const[imageUrl,setImageUrl]= useState("");
    const[showModel,setShowModel]=useState("close");
    const userName = useSelector(selectUserName);
    const userPhoto= useSelector(selectUserPhoto);
    

    const handleSubmit= (e) =>{
        e.preventDefault();
        db.collection('posts').add({
            message:input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic:userPhoto,
            username:userName,
            image:imageUrl 

        })
        // does not refresh once the value is submited
        setInput(""); //reset the input field
        setImageUrl(""); //reset the imamge inpur field
    }
    const handleClick= (e) =>{
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }  
        switch(showModel){
        case"open":
            setShowModel("close");
            break;
        case"close":
            setShowModel("open")
            break;
        default:
            setShowModel("close")
            break;
        }
       
    }
    return (
        <div className="messageSender">
            <div className="messageSender__top">
           <Container>
            <ShareBox>
                  <div>
                      <Avatar src={userPhoto}/>
                      <button onClick={handleClick}>What is on your mind?</button>
                  </div>
                  
            </ShareBox>
            </Container> 
            </div>
          <PostModal showModel={showModel} handleClick={handleClick}/>
        </div>
    )
}
const Container= styled.div`
grid-area:main;
width:100%;
`;
const CommonCard= styled.div`
text-align:center;
overflow:hidden;
margin-bottom:8px;
background-color:#fff;
border-radius:5px;
position:relative;
border:none;

box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
width:100%;
`;
const ShareBox = styled(CommonCard)`
display:flex;
flex-direction: column;
color: #958b7b;
margin: 0 0 8px;
background-color:white;
width:100%;
div{
margin-top: -5px;

    button{
        outline:none;
        color:rgba(0,0,0,0.6);
        font-size:14px;
        line-height:1.5;
        min-height:60px;
        background:transparent;
        border:none;
        display:flex;
        align-items:center;
        font-weight:600;
        text-align:center;

    }
    &:first-child{
        display:flex;
        align-items:center;
        padding:8px 16px 0px 16px;
        img{
            width:48px;
            border-radius:50%;
            margin-right:8px;
        }
        button{
            text-align:center;
            margin:4px 0;
            flex-grow:1;
            border-radius:35px;
            padding-left:16px;
            border:1px solid rgba(0,0,0,0.15);
            background-color:white;
            text-align:left;
        }
    }
}

`; 
export default MessageSender 
