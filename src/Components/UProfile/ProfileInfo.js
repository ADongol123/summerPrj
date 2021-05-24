import { PostAddTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import db from '../../firebase'
import "./Css/ProfileInfo.css"
import Profile from './Profile'
import {selectUserName,
    selectUserPhoto,
    selectUserEmail
} from "../../features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"


function Feed() {
    const[posts, setPosts]=useState([]);
    const userName = useSelector(selectUserName);
    const userPhoto= useSelector(selectUserPhoto);
    const userEmail=useSelector(selectUserEmail);
    useEffect(() => {
       db.collection('posts').orderBy("timestamp","desc").onSnapshot((snapshot)=>
       setPosts(snapshot.docs.map((doc)=> ({id: doc.id, data:doc.data()})))
       )
        }
    , [])
    return (
        <div className="profileinfo">
           <div className="profileinfo__left">
             <div class="profile-card">
                 <div class="card-header">
                    <div class="pic">
                        <img src={userPhoto} alt=""/>
                    </div>
                        <div class="name">{userName}</div>
                        <div class="desc">{userEmail}</div>
                </div>
                   
            </div>
        </div>
            <div className="profileinfo__right">
                <div className="profileright__titile">
                    <p>POSTS</p>
                </div>
            
            {posts.map((post)=>(
               
            
               <Profile
               key={post.id}
               post={post}
               postId={post.id}
               profilePic={post.data.profilePic}
               message={post.data.message}
               timestamp={post.data.timestamp}
               username={post.data.username}
               image={post.data.image}
               
            /> 
           
          
        ))}
        
            </div>
             
        </div>
    )
}

export default Feed
