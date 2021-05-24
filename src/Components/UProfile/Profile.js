import React from 'react'
import "./Css/Profile.css"
import { useEffect, useState } from 'react'

import{Avatar, Button} from "@material-ui/core"
import {
  
    Modal,
    Input,
  } from "@material-ui/core";
import db from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import firebase from 'firebase'
import { format, render, cancel, register } from 'timeago.js';
import {selectUserName,
  selectUserPhoto,
  selectUserEmail
} from "../../features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"
const useStyles = makeStyles((theme) => (
  {
    paper:{
      position:"relative",
      left: 50,
      top:50,
    // position: "center",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    width: 150,
    // border: '2px solid #000',
    margin: "10px",
  }
    
  }
)) 
function Profile({post,profilePic, image, username,timestamp,message,postId }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input,setInput] = useState();
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [updatedDate, setUpdatedDate] = useState(null)
  const userName = useSelector(selectUserName);
  const userPhoto= useSelector(selectUserPhoto);
  const userEmail= useSelector(selectUserEmail);

  useEffect(() => {
    let unsubscribe
    if (postId) {
        console.log(postId)
        unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
                console.log(comments)
            })
    }

   

}, [postId])
const postComment = (event) => {
    event.preventDefault()

    db.collection('posts').doc(postId).collection('comments').add({
        text: comment,
        username:userName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('')
}
  const updateTodo = () =>{
      db.collection('posts').doc(post.id).set(
        {
          message:input,
        },
        {
          merge:true
        }
      )
      setOpen(false)
    }

    useEffect(() => {
      const fetchDate = async() => {
          try{
              const new_Data = new Date()
              const seconds = new_Data.getHours() / 1000;
              const timeSec = timestamp.seconds   
              const updateedDate = (timeSec - seconds)
              const date = new Date(updateedDate * 1000);
              setUpdatedDate(format(date, 'en_US'))
          }catch(err){
              console.log(err.message)
          }
      }
      fetchDate()
  }, [updatedDate])
  return (
    <div>
      <div className="profile">
      
      
      {userName === username && userPhoto===profilePic ? 
      (   <>
            <Modal open={open} onClose={(e) => setOpen(false)}>
              <div className={classes.paper}>
                    <h3>Update The Post</h3>
                    <input
                      placeholder={post.post}
                      value={input}
                      onChange={(Event) => setInput(Event.target.value)}
                    />
                    <Button
                    variant="contained"
                    color="default"
                    onClick={updateTodo}
                    className={classes.button}
                    >
                      Upload
                    </Button>
              </div>
           </Modal> 
         <div className="profile__top">
                <Avatar src={profilePic}
                className="post__avatar"
                />
                <div className="post__topInfo">
                        <h3>{username}</h3>
                      
                </div>
                <div className="edit">
                  <div className="edit__icons">
                    <CreateIcon 
                    onClick={(e) => setOpen(true)}
                    className="edit__create" fontSize="large"/>  
                  </div>
                </div>
                <div>
                <div className="edit__icons">
                 <DeleteIcon 
                         onClick={(Event) =>
                        db.collection("posts").doc(post.id).delete()
                      }
                    fontSize="large"/>
                 </div> 
                
                </div>
            </div>
            <div className="post_bottom">
            <p className="post__timestamp">{updatedDate}</p> 
                <p>{message}</p>
            </div>
            <div className="post__image">
            {
                    image === "" ? (console.log("empty")):(<> 
                    <img src={image} alt=""/>
                    </>)
                }
            </div>
            <div className="post__comments">
                {comments.map((comment)=>(
                    <p>
                        <strong>{userName}</strong> {comment.text}
                    </p>
                ))}
            </div>
            <form className='post__commentBox'>
                <input
                    className='post__input'
                    type="text"
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='post__button '
                    disabled={!comment}
                  
                    type='submit'
                    onClick={postComment}
                   >Post</button>
            </form> 
            </>
           ):(
              console.log("usernmae")
           )}
      
    </div>
    </div>
  )
}

export default Profile
