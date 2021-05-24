import React,{useState,useEffect} from 'react'
import"./Css/Display.css"
import { makeStyles } from "@material-ui/core/styles";
import { Modal} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import{TextField} from "@material-ui/core"
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
const useStyles = makeStyles((theme) => (
    {
      paper:{
          display:"flex",
         flexDirection:"column",
        position:"relative",
        left: 20,
        top:50,
      // position: "center",
      height:800,
      width: 1800,
     
      backgroundColor: theme.palette.background.paper,
       border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  
 
     } )) 
function Display({tableData}) {
  
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    return (
        <div className="display_main">
            
             <div>
             {  
                
                   tableData && tableData.map((n) =>(
                       
                <Modal open={open} onClose={(e) => setOpen(false)}>
                <div className={classes.paper}>
                    <div className="modal_main">
                        
                <table className="content-table">
                <thead>
                    <tr>
                    <th>Company Name</th>
                    <th>Email</th>
                    
                    <th>Department</th>
                    <th>No. of items</th>
                    <th>City</th>
                    
                    </tr>
                </thead>
                {
                   tableData && tableData.map((n) =>(
                        <tbody>
                        <tr>
                        <td>{n.data.Name}</td>
                        <td>{n.data.Email}</td>
                        <td>{n.data.Department}</td>
                        <td>{n.data.Items}</td>
                        <td>{n.data.city}</td>
                        
                        </tr>
                        
                    </tbody>
                    ))
                }
            
               
</table>
                    
</div>
                </div>
            
            </Modal> 
             ))
            }
            
            </div>
           <table className="content-table">
                
                {
                   tableData && tableData.map((n) =>(
                       
                        <tbody>
                        <tr>
                        <td>{n.data.Name}</td>
                        
                        </tr>
                        
                    </tbody>
                    ))
                }
                
           </table>
    
                    <Button 
                         onClick={(e) => setOpen(true)}
                        className="table_button">Details</Button>
                        


      
        
        </div>
    )
}

export default Display
