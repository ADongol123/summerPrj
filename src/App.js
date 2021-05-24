import React from 'react';
import './App.css';
import Sidebar from "./Components/Post/Sidebar"
import {selectUserName,
  selectUserPhoto,
  setuserLogin,
  setSignout
} from "./features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"
import Login from './Login';
import Header from './Header';
import Feed from './Components/Post/Feed';
import Application from "./Components/Chat/Application"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Profile from "./Components/UProfile/ProfileInfo"
function App() {
const userName = useSelector(selectUserName);

  return (
    <div className="App">
      {!userName ? (<Login/>):(
        <>
        <Router>
          <Header/>
          <Route path ="/" exact components={Feed}>
          <Sidebar/>
          <Feed/> 
          </Route>
          <Route path="/Application"  component={Application}>
           
            <Application/>

          </Route>
          <Route path="/Profile"  component={Profile}>
          
          </Route> 
        </Router>
        
        </>
      )}
      
    </div>
  );
}

export default App;
