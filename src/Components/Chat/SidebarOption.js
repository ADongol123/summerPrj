import React from 'react'
import { useHistory } from 'react-router-dom'
import db from '../../firebase';
import "./SidebarOption.css"
function SidebarOption({Icon, title,id,addChannelOption}){ 
const history = useHistory();
const selectChannel= () =>{
    if(id){
        history.push(`/room/${id}`)
    }
    else{
        history.push(`title`)
    }
}
const addChannel = () =>{
    const channelName=prompt('please enter a channel name')
    if(channelName){
    db.collection('rooms').add({
        name:channelName
    })
      }
}

    return (
        <div className="sidebar__Option" onClick={addChannelOption ? addChannel: selectChannel}>
            {Icon &&<Icon className="sidebarOption__icon"/>}
            {Icon ?(
                <h3>{title}</h3>
            ):(
                <h3 className="sidebarOption___channel"> 
                    <span className="sidebarOption___hash">#</span>{title}
                </h3>
            )}
        </div>
    )
}

export default SidebarOption
