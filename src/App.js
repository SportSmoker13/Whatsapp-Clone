import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import React from 'react'
import './App.css';
import Chat from './Chat';
import  Sidebar from './Sidebar';
// import Username from './Username';

function App() { 
    return (
    <div className="app">
      <div className="app_body">
        <Router>
          <Switch>
            <Route path="/rooms/:roomId">
              <Sidebar /> 
              <Chat />
            </Route>
            <Route path="/">
              {/* <Username /> */}
              <Sidebar />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
    
  );
}

export default App;
