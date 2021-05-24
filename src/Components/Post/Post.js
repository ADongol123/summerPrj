import React,{useState,useEffect} from 'react'
import './Css/Post.css'
import{Avatar, Button} from "@material-ui/core"
import db  from "../../firebase"
import firebase from 'firebase'

import { format, render, cancel, register } from 'timeago.js';
import {selectUserName,
    selectUserPhoto,
    setuserLogin,
    setSignout
} from "../../features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"



function Post({postId,video,profilePic, image, username,timestamp,message }) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const userName = useSelector(selectUserName);
    const userPhoto= useSelector(selectUserPhoto);
    const [updatedDate, setUpdatedDate] = useState(null)

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
                    // console.log(comments)
                })
        }

        return () => {
            unsubscribe()
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
    
   

    return (
        <div className="post">
            <div className="post_top">
                
                <Avatar src={profilePic}
                className="post_avatar"
                />
                <div className="post_topInfo">
                        <h3>{username}</h3>
                         
                </div>
             
                
                
            </div>
            <div className="post_bottom">
               <p className="post__timestamp">{updatedDate}</p> 
                <p>{message}</p>
            </div>
            <div className="post_image">
                {
                    image === "" ? (console.log("empty")):(<> 
                    <img src={image} alt=""/>
                   
                    </>)
                }

            </div>
            <div className="post_comments">
               
                {comments.map((comment)=>(
                    <p>
                        <strong>{userName}</strong> {comment.text}
                    </p>
                ))}
            </div>
            <form className='post_commentBox'>
                <input
                    className='post_input'
                    type="text"
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='post_button '
                    disabled={!comment}
                  
                    type='submit'
                    onClick={postComment}
                   >Post</button>
            </form> 
          
        </div>
    )
}

export default Post
