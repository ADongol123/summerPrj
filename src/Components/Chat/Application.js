import React, { useState } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import './Application.css';
import Sidebar from "./Sidebar"
import Chat from './Chat';






function Application() {
  
 

  return (
    <div className="application">
      <Router> 
     <div className="application__body">
     <Sidebar/>
      <Switch>
        <Route path="/room/:roomId">
            <Chat/>
        </Route>
        <Route path="/">
          <h1 className="font">Welcome</h1>
        </Route>
      </Switch>
     </div>
     
     )
     </Router>
     
   
    </div>
     
  )
}

export default Application;
