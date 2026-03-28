


import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getRole } from "../../Services/LoginService";
import { getAllLostItems, getLostItemsByUsername } 
from "../../Services/LostItemService";

const LostItemReport=()=>{

let navigate = useNavigate();
    const [itemList,setItemList] = useState([]);
    const [role,setRole]=useState("");
 
const showLostItems=()=>{
      getRole().then((response)=>{
          setRole(response.data);
          if(response.data==='Admin'){
            getAllLostItems().then((res1)=>{
              setItemList(res1.data);
           });
          }
          else if (response.data==='Student'){
            getLostItemsByUsername().then((res2)=>{
              setItemList(res2.data);
           });
          }
        });
    }
    useEffect(() => {
       showLostItems();
    }, []);
 
 
const returnBack=()=>{
      if(role==='Admin')
         navigate('/admin-menu');
      else if(role==='Student')
        navigate('/student-menu');
  }
 
return (
  <div className="lost-list-page">

    {/* HEADER SECTION */}
    {role === 'Student' ? (
      <div className="student-header">
        <h2>Student Lost Item List</h2>
      </div>
    ) : (
      <div className="admin-header">
        <h2>Admin Lost Item List</h2>
      </div>
    )}

    <div className="lost-list-container">

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Lost Date</th>
              <th>User Id</th>
              <th>Status</th>
              {role === 'Student' ? <th>Search</th> : null}
            </tr>
          </thead>

          <tbody>
            {itemList.map((item) => (
              <tr key={item.lostItemId}>
                <td>{item.lostItemId}</td>
                <td>{item.lostItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{item.lostDate}</td>
                <td>{item.username}</td>

                {item.status ? (
                  <td className="text-primary fw-bold">Found</td>
                ) : (
                  <td className="text-danger fw-bold">Not Found</td>
                )}

                {role === 'Student' ? (
                  <td>
                    <Link to={`/search/${item.lostItemId}`}>
                      <button className="btn btn-warning btn-sm">
                        Search Find Item
                      </button>
                    </Link>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-3">
        <button
          onClick={() => returnBack()}
          className="btn btn-gradient flex-fill"
        >
          Return
        </button>
      </div>

    </div>

    {/* FOOTER */}
    <footer className="lost-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </footer>

  </div>
);

};
export default LostItemReport;