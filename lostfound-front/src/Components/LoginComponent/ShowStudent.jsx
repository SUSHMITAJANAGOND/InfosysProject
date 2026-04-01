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
return (
  <div className="page-layout">

    {/* HEADER */}
    <div className="app-header">
      <h2>Student Personal Details</h2>
    </div>

    {/* BACKGROUND IMAGE SECTION */}
    <div className="image-section">

      {/* CONTENT */}
      <div className="content-container text-center">

        <div className="row justify-content-center">
          <div className="col-md-6">

            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td className="col-6 fw-bold">User Id:</td>
                  <td className="col-6">{lostFoundUser.username}</td>
                </tr>

                <tr>
                  <td className="col-6 fw-bold">Personal Name:</td>
                  <td className="col-6">{lostFoundUser.personalName}</td>
                </tr>

                <tr>
                  <td className="col-6 fw-bold">Email:</td>
                  <td className="col-6">{lostFoundUser.email}</td>
                </tr>
              </tbody>
            </table>

            <button
              style={{ marginTop: "10px" }}
              onClick={returnBack}
              className="btn-gradient"
            >
              Return
            </button>

          </div>
        </div>

      </div>
    </div>

    {/* FOOTER */}
    <div className="app-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </div>

  </div>
);
}
export default ShowStudent;