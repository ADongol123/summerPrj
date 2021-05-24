import React, { forwardRef } from 'react'
import "./Message.css"
const Message = forwardRef(({message,timestamp,user,userImage},ref)=>
 {
     const isUser = user===message.user
    return (
        <div ref={ref}className={`message ${isUser && 'message'}`}>
            <div className={isUser ? "message_usercard":"message_guestcard"}>
            <img src={userImage}/>
            <div className="message__info">
                <h4> 
                    {user}
                     <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                     <p>{message}</p>
            </div>
            </div>
        </div>
    )
}
)
export default Message
