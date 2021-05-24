import React from 'react'
import {Avatar} from "@material-ui/core"
import"./Css/SidebarRow.css"
function SidebarRow({src,title}) {
    return (
        <div className="sidebarRow">
        {src && <Avatar src={src}/>}
       
        <h4>{title}</h4>
        
    </div>
    )
}

export default SidebarRow
