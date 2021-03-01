import {React,useEffect , useState} from 'react'
import './Sidebar.css'
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded'
import ChatIcon from '@material-ui/icons/Chat'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import User from './User'
import './Username';
import db from "./firebase";

function Sidebar() {
    const [rooms,setRooms] = useState([]);
    
    useEffect(()=>{db.collection("rooms").onSnapshot(snapshot=>setRooms(snapshot.docs.map(doc=>({id: doc.id,data: doc.data(),}))));},[]);

    return (
        <div className="sidebar">
           <div className="profile">
           <IconButton><AccountCircleRounded style={{ fontSize: 50 }}/></IconButton>
           <h2>{global.username}</h2>
               <div className="sidebar_profile_icons">
                    <IconButton><ChatIcon  /></IconButton>
                    <IconButton><DonutLargeIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
           </div>
           <div className="search">
                <div className="search_bar">    
                    <SearchIcon />
                    <input placeholder="Search or Start a New Chat" type="text" />
                </div>
           </div>
           
           <div className="chats">
                <User addNewChat/>
                {rooms.map(room=>(<User key={room.id} id={room.id} name={room.data.name} />))}          
           </div>
        </div>
    )
}

export default Sidebar
