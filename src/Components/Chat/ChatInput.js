import React, { useState } from "react";
import db from "../../firebase";
import "./ChatInput.css";
import {selectUserName,
  selectUserPhoto,
 
} from "../../features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const userName = useSelector(selectUserName);
    const userPhoto= useSelector(selectUserPhoto);
  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: userName,
        userImage: userPhoto,
      });
    }

    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message # ${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;