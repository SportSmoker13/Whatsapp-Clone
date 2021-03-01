import {React,useState,useEffect} from 'react'
import './Chat.css'
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from "firebase";
import './Username';

function Chat() {     
    const {roomId} = useParams();
    const [input,setInput] = useState([]);
    const [roomName,setRoomName] = useState("");
    const [messages,setMessage] = useState([]);
    useEffect( () => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection("rooms").doc(roomId).collection("chats").orderBy('timestamp','asc').onSnapshot((snapshot)=>setMessage(snapshot.docs.map((doc)=>doc.data())));
        }
    },[roomId])

    const sendMessage = (event) =>{
        event.preventDefault(); 
        db.collection("rooms").doc(roomId).collection("chats").add({
            message: input,
            name: global.username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    };

    return (
        
        <div className="chat_main">
           <div className="chat_header">
                <div className="chat_header_icon">
                    <AccountCircleRounded style={{ fontSize: 50 }}/>
                </div>
                <div className="chat_header_name">
                    <h3>{roomName}</h3>
                    <p>
                        Last Seen {""}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_header_icons">
                    <IconButton><AttachFileIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
           </div>
           <div className="chat_body">
               {messages.map(message=>(
                <p className={`chat_text ${message.name===global.username && "chat_receiver_text"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                <span className="chat_time">
                    {new Date(message.timestamp?.toDate()).toUTCString()}    
                </span>
               </p>
               ))}
           </div>
           <div className="chat_footer">
                <IconButton><EmojiEmotionsIcon /></IconButton>
                <form>
                    <input placeholder="Type a message" type="text" value={input} onChange={(event)=>setInput(event.target.value)}/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton><MicIcon /></IconButton>
           </div>
        </div>
    )
}

export default Chat
