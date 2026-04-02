import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {getAllStudents,deleteUser} from "../../Services/LoginService";
 import '../../DisplayView.css';


const StudentReport=()=>{
    let navigate = useNavigate();
    const [lostFoundUser, setLostFoundUser]=useState([]);


    const setAllStudents=()=>{
        getAllStudents().then((response)=>{
          console.log("API DATA",response.data);
            setLostFoundUser(response.data);
        });
    }

    useEffect(()=>{
        setAllStudents();
    },[]);

    const returnBack=()=>{
        navigate('/admin-menu');
    }

    const removeStudent=(id)=>{
        deleteUser(id).then(response => {
            let remainStudents=lostFoundUser.filter((student)=>(student.username !== id));
            setLostFoundUser(remainStudents);
            navigate('/student-repo');
        });
    }

    
  return (
  <div className="page-layout">

    {/* HEADER */}
    <div className="app-header">
      <h2>Student List</h2>
    </div>

    {/* BACKGROUND IMAGE */}
    <div className="image-section">

      {/* CONTENT */}
      <div className="content-container text-center">

        <div className="row justify-content-center">
          <div className="col-md-10">

            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Personal Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  lostFoundUser.map((student) => (
                    <tr key={student.username}>
                      <td>{student.username}</td>
                      <td>{student.personalName}</td>
                      <td>{student.email}</td>
                      <td>
                        <button
                          style={{ marginLeft: "10px" }}
                          onClick={() => removeStudent(student.username)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
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
export default StudentReport;