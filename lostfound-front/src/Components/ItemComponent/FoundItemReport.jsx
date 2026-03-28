


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRole } from "../../Services/LoginService";
import { getAllFoundItems, getFoundItemsByUsername } 
from "../../Services/FoundItemService";

const FoundItemReport=()=>{

let navigate = useNavigate();
    const [itemList,setItemList] = useState([]);
    const [role,setRole]=useState("");
 
const showFoundItems=()=>{
      getRole().then((response)=>{
          setRole(response.data);
          if(response.data==='Admin'){
            getAllFoundItems().then((res1)=>{
              setItemList(res1.data);
           });
          }
          else if (response.data==='Student'){
            getFoundItemsByUsername().then((res2)=>{
              setItemList(res2.data);
           });
          }
        });
    }
    useEffect(() => {
       showFoundItems();
    }, []);
 
 
const returnBack=()=>{
      if(role==='Admin')
         navigate('/admin-menu');
      else if(role==='Student')
        navigate('/student-menu');
  }
 
return (
  <div className="lost-list-page">

    {/* HEADER */}
    <div className="student-header">
      {role === "Admin"
        ? <h2>Admin Found Item List</h2>
        : <h2>Student Found Item List</h2>}
    </div>

    {/* TABLE SECTION */}
    <div className="lost-list-container">

      <table className="table table-striped table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Item Id</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Color</th>
            <th>Brand</th>
            <th>Location</th>
            <th>Found Date</th>
            <th>User Id</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(itemList) &&
            itemList.map((item) => (
              <tr key={item.foundItemId}>

                <td>{item.foundItemId}</td>
                <td>{item.foundItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{item.foundDate}</td>
                <td>{item.username}</td>

                {item.status
                  ? <td className="status-returned">Returned</td>
                  : <td className="status-available">Available</td>
                }

              </tr>
            ))}
        </tbody>

      </table>

      {/* RETURN BUTTON */}
      <div className="text-center mt-3">
        <button
          onClick={returnBack}
          className="btn btn-gradient"
        >
          Return
        </button>
      </div>

    </div>

    {/* BACKGROUND IMAGE SECTION */}
    <div className="student-image-section"></div>

    {/* FOOTER */}
    <footer className="lost-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </footer>

  </div>
);

};
export default FoundItemReport;