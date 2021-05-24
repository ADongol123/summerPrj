import React from 'react'
import styled from "styled-components"
import {useState} from "react"
import{Avatar} from "@material-ui/core"
import db from "../../firebase";
import firebase from "firebase"
import {selectUserName,
    selectUserPhoto,
    setuserLogin,
    setSignout
} from "../../features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"


function PostModal(props) {
const[editorText,setEditorText]=useState("");
const[shareImage,setShareImage]=useState("");
const[videoLink,setVideoLink]=useState("");
const[assetArea,setAssetArea]=useState("");
const[input,setInput]= useState("");
const[imageUrl,setImageUrl]= useState("")
const[videoUrl,setVideoUrl]= useState("")
const userName = useSelector(selectUserName);
const userPhoto= useSelector(selectUserPhoto);
const handleChange = (e) =>{
    const image = e.target.files[0];
     if(image === "" || image === undefined)
     {
         alert(`not an image,the file is a ${typeof image}`);
         return;
     }
     setShareImage(image);

}
const switchAssetArea=(area)=>{
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
}
const reset = (e) =>{
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    props.handleClick(e);
}
const handleSubmit= (e) =>{
    e.preventDefault();
    db.collection('posts').add({
        message:editorText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic:userPhoto,
        username:userName,
        image:imageUrl,
        video:videoUrl

    })
    // does not refresh once the value is submited
    setInput(""); //reset the input field
    setImageUrl("");
    setVideoUrl(""); //reset the imamge inpur field
}
function videoChange(e){
    console.log(e.target.value);
    e.preventDefault();
   
}
function _onReady(e){
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
}
    return (
        <div>
            { props.showModel === "open" &&
        <Container>
            <Content>
               <Header>
                   <h2>Create a post</h2>
                   <button onClick= {(e)=> reset(e) }>
                       <img src="/img/close.png" alt=""/>
                   </button>
               </Header>
               <SharedContent>
                   <UserInfo>
                         <Avatar src={userPhoto}/>

                        <span>{userName}</span>
                   </UserInfo>
                   <Editor>
                   <textarea
                   value={editorText}
                   onChange={(e) => setEditorText(e.target.value)}
                   placeholder="What do you want to post?"
                   autoFocus={true}
                    />
                    {
                        assetArea === "image" ?
                    
                    <UploadImage>
                         <input
                    value={imageUrl}
                    onChange={e=>setImageUrl(e.target.value)}
                     placeholder="image URL (Optional)"                     
                    />
                        {
                            shareImage && <img src={URL.createObjectURL(shareImage)}/>
                        }
                         </UploadImage>
                         :
                         <>
                         
                            
                         </>
                    }
                   
                    
                  </Editor> 
               </SharedContent>
               <ShareCreation>
                   <AttachAssets>
                       <AssetButton onClick={()=> switchAssetArea('image')}>
                           <img src="/img/gal.png" alt=""/>
                       </AssetButton>
                       {/* <AssetButton onClick={()=> switchAssetArea('media')}>
                           <img src="/img/video.png" alt="" />
                       </AssetButton> */}
                   </AttachAssets>
                  

                   <PostButton disabled={!editorText ? true : false}onClick={handleSubmit} type="submit">
                        Post

                   </PostButton>
               </ShareCreation>
            </Content>  
        </Container> 
}
        </div>
    )
}
const Container = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
z-index:9999;
color:black;
background-color: rgba(0,0,0,0.8);
animation: fadeIn 0.3s;
`;
const Content =styled.div`
width:100%;
max-width:552px;
background-color:white;
max-height:90%fit-content;
overflow:initial;
border-radius: 5px;
position:relative;
display:flex;
flex-direction:column;
top:32px;
margin: 0 auto;
`;
const Header= styled.div`
display:block;
padding: 16px 20px;
border-bottom: 1px solid rgba(0,0,0,0.15); 
font-size:16px;
line-height:1.5;
color:rgba(0,0,0,0.6);
font-weight : 400;
display:flex;
justify-content:space-between;
align-items:center;
button{
    height:40px;
    width:40px;
    min-width: width auto;
    color:rgba(0,0,0,0.15);
    img{
        width:40px;
        height:40px;
        margin-left:-8px;
        margin-top:-3px;
        pointer-events:none;
    }
}
svg{
    pointer-events:none;
}

`;
const SharedContent=styled.div`
display:flex;
flex-direction:column;
flex-grow:1;
overflow-y:auto;
vertical-align:baseline;
background:transparent;
padding:8px 12px;

`;
const UserInfo = styled.div`
display:flex;
align-items:center;
padding:12px 24px;
svg,img{
    width:48px;
    height:48px;
    background-clip:content-box;
    border: 2px solid transparent;
    border-radius:50%;

}
span{
    font-weight:600;
    font-size:16px;
    line-height:1.5;
    margin-left:5px;
}
`;
const ShareCreation = styled.div`
display:flex;
justify-content:space-between;
padding:12px 24px;

`;
const AssetButton = styled.button`
display:flex;
align-items:center;
height:40px;
min-width:auto;
color:rgba(0,0,0,0.5);
    img{
        height:40px;
        width:40px;
    }
`;
const AttachAssets = styled.div`
align-items:center;
display:flex;
padding-right:8px;
${AssetButton}{
    width:58px;
}
`;
const ShareComponent= styled.div`
padding-left:8px;
margin-right:auto;
border-left: 1 px solid rgba(0,0,0,0.15);
${AssetButton}{
    svg{
        margin-right:5px;
    }
}
`;
const PostButton=styled.button`
min-width:60px;
border-radius:20px;
padding-left:16px;
padding-right:16px;
background:${(props) => props.disabled ?'rgba(0,0,0,0.8)':'#0a66c2' };
color:white;
&:hover{
    background:#004182;
}
`;
const Editor = styled.div`
padding:12px 24px;
textarea{
    width:100%;
    min-height:100px;
    resize:none;
    }
    input{
        width:100%;
        height:35px;
        font-size: 16px;
        margin-bottom: 20px;    
    }
`;
const UploadImage = styled.div`
text-align:center;
img{
    width:100%;
}
`;
export default PostModal
