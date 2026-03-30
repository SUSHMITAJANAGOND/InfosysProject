import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getUser} from "../../Services/LoginService";
import '../../DisplayView.css';

const ShowStudent=()=>{
const [lostFoundUser,setLostFoundUser] = useState({
    username:"",
    password: "",
    personalName:"",
    email:"",
    role:"",
});
let navigate = useNavigate();
const setStudentRecord=()=>{
 getUser().then((response)=>{
    setLostFoundUser(response.data);
    });
}
     
useEffect(() => {
setStudentRecord();
}, []);
 
const returnBack=()=>{
navigate('/student-menu');
}

return(
        <div className="text-center">
         <div>
           <h2 className="text-center">Student Personal Details</h2>
           <div className = "row">
             <table className = "table table-striped table-bordered">
               <tbody>
                 <tr>
                   <td class="col-4">User Id:</td>
                   <td class="col-4">{lostFoundUser.username}</td>
                  </tr>
                  <tr>
                   <td class="col-4">Personal Name:</td>
                   <td class="col-4">{lostFoundUser.personalName}</td>
                  </tr>
                  <tr>
                   <td class="col-4">Email:</td>
                   <td class="col-4">{lostFoundUser.email}</td>
                 </tr>
               </tbody>
               
          </table>  
         <div>
          <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>
         </div>        
         </div>
        </div>
       </div>
     );
}
export default ShowStudent;