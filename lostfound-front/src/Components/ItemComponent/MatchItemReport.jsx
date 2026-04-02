import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../Services/LoginService";
import { getAllMatchItems } from "../../Services/MatchItemService";
import "../../DisplayView.css";

const MatchItemReport = () => {

  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  const showMatchItems = () => {
    getRole().then((response) => {
      setRole(response.data);
      getAllMatchItems().then((res) => {
        setItemList(res.data);
      });
    });
  };

  useEffect(() => {
    showMatchItems();
  }, []);

  const returnBack = () => {
    if (role === 'Admin')
      navigate('/admin-menu');
    else if (role === 'Student')
      navigate('/student-menu');
  };

  
return (
  <div className="page-layout">

    {/* HEADER */}
    <div className="app-header">
      {
        role === 'Admin'
          ? <h2>Admin Match Item List</h2>
          : <h2>Student Match Item List</h2>
      }
    </div>

    {/* BACKGROUND IMAGE SECTION */}
    <div className="image-section">

      {/* CONTENT */}
      <div className="content-container text-center">

        {/* SECTION BOX */}
        <div className="section-box">

          {/* TITLE (THIS WAS MISSING) */}
          <h3 className="section-title">Matched Item List</h3>

          <div className="row">
            <table className="table table-striped table-bordered table-hover">

              <thead>
                <tr>
                  <th>Lost Item Id</th>
                  <th>Found Item Id</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Lost Username</th>
                  <th>Found Username</th>
                </tr>
              </thead>

              <tbody>
                {
                  itemList.map((item) => (
                    <tr key={`${item.matchItemId.lostItemId}-${item.matchItemId.foundItemId}`}>
                      <td>{item.matchItemId.lostItemId}</td>
                      <td>{item.matchItemId.foundItemId}</td>
                      <td>{item.itemName}</td>
                      <td>{item.category}</td>
                      <td>{item.lostUsername}</td>
                      <td>{item.foundUsername}</td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
          </div>

        </div>

        <br />

        {/* BUTTON */}
        <button
          onClick={returnBack}
          className="btn-gradient"
        >
          Return
        </button>

      </div>
    </div>

    {/* FOOTER */}
    <div className="app-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </div>

  </div>
);

};

export default MatchItemReport;