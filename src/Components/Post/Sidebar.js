import React,{useState,useEffect} from 'react'
import SidebarRow from './SidebarRow'
import {selectUserName,
    selectUserPhoto,
    setuserLogin,
    setSignout
} from "../../features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"
import "./Css/Sidebar.css"
import Display from './Display'
import db from "../../firebase"
function Sidebar() {
  const[datas, setDatas]=useState([]);

    const userName = useSelector(selectUserName);
    const userPhoto= useSelector(selectUserPhoto);
    useEffect(() => {
        async function getData(){
          try{
            db.collection('data').onSnapshot((snapshot)=>
            setDatas(snapshot.docs.map((doc)=> ({id: doc.id, data:doc.data()}))))
            
          }catch(err){
            console.log(err)
          }
        }
        getData()
      
         }
      , [])
    return (
        <div className="ssidebar">
            <SidebarRow 
             src={userPhoto} title={userName}
            />
             <Display
            className="display_main"
                    tableData={datas}
                 />
        </div>
    )
}

export default Sidebar
