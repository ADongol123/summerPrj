import React,{useState,useEffect} from 'react'
import "./Css/Feed.css"
import db from "../../firebase"
import MessageSender from "./MessageSender"
import Post from './Post';
function Feed() {
    const[posts, setPosts]=useState([]);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    useEffect(() => {
       db.collection('posts').orderBy("timestamp","desc").onSnapshot((snapshot)=>
       setPosts(snapshot.docs.map((doc)=> ({id: doc.id, data:doc.data()})))
       )
        }
    , [])
    return (
        <div className="feed">
            <MessageSender/>
            {posts.map((post)=>(
                 <Post
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
    )
}

export default Feed
