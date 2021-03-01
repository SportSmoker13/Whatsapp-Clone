import {React,useState,useEffect} from 'react'
import  './User.css'
import './Sidebar'
import { IconButton } from '@material-ui/core'
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded'
import db from './firebase'
import { Link } from "react-router-dom";

function User({key,id,name,addNewChat}) {
    const [messages,setMessage] = useState([]);
    const createChat = () => {
        const roomName = prompt("Please Enter Room Name");

        if(roomName){
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };
    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection("chats").orderBy('timestamp','desc').onSnapshot((snapshot)=>setMessage(snapshot.docs.map((doc)=>doc.data())));
        }
    },[id])
    if(global.admin){
        return !addNewChat ? (
            <Link to={`/rooms/${id}`}>
                <div className="chat">
                    <IconButton><AccountCircleRounded style={{ fontSize: 40 }}/></IconButton>
                    <div className="chat_info">
                        <h2>{name}</h2>
                        <p>{messages[0]?.name}: {messages[0]?.message}</p>
                    </div>
                </div>
            </Link>
        ):(
            <div onClick={createChat} className="chat">
                <h2>Add New Chat</h2>
            </div>
        );
    }
    else{
        return !addNewChat ? (
            <Link to={`/rooms/${id}`}>
                <div className="chat">
                    <IconButton><AccountCircleRounded style={{ fontSize: 40 }}/></IconButton>
                    <div className="chat_info">
                        <h2>{name}</h2>
                        <p>{messages[0]?.message}</p>
                    </div>
                </div>
            </Link>
        ):(
            <div className="chat">
                {/* <h2>Add  Chat</h2> */}
            </div>
        );
    }
    
}

export default User
