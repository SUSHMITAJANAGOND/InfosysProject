import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";

const MatchItemSearch = () => {

const navigate = useNavigate();
const param = useParams();

const [flag, setFlag] = useState(false);

const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: "",
    status: false,
});

const [foundItemDTOList, setFoundItemDTOList] = useState([]);



useEffect(() => {
    const fetchData = async () => {
        try {
            const lost = await getLostItemById(param.bid);
            setLostItem(lost.data);

            const found = await getFoundItemsByLostItem(param.bid);
            setFoundItemDTOList(found.data);

            console.log("FOUND ITEMS:", found.data);

        } catch (error) {
            console.error("API error:", error);
        }
    };

    fetchData();
}, [param.bid]);

// 🔥 Navigate back
const returnBack = () => {
    navigate('/lost-list');
}

// 🔥 Match item
const claimItem = (foundItemId, foundUser) => {

    const matchItem = {
        lostItemId: lostItem.lostItemId,
        foundItemId: foundItemId,
        itemName: lostItem.lostItemName,
        category: lostItem.category,
        lostUsername: lostItem.username,
        foundUsername: foundUser
    };

    saveMatchItem(matchItem).then(() => {
        setFlag(true);
    });
}

   
return (
  <div className="page-layout">

    {/* HEADER */}
    <div className="app-header">
      <h2>Lost & Found Locator</h2>
    </div>

    {/* BACKGROUND IMAGE SECTION */}
    <div className="image-section">

      {/* CONTENT */}
      <div className="content-container text-center">

        {/* ✅ BACKGROUND WRAPPER START */}
    <div style={{
      backgroundColor: "rgba(255,255,255,0.9)",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px"
    }}></div>

        {/* LOST ITEM */}
        <h3>Student's Lost Item</h3>

        <div className="row">
          <table className="table table-striped table-bordered table-hover">
            <thead>
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
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{lostItem.lostItemId}</td>
                <td>{lostItem.lostItemName}</td>
                <td>{lostItem.category}</td>
                <td>{lostItem.color}</td>
                <td>{lostItem.brand}</td>
                <td>{lostItem.location}</td>
                <td>{lostItem.lostDate}</td>
                <td>{lostItem.username}</td>
                <td>Not Found</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        {/* FOUND ITEMS */}


<div style={{
  backgroundColor: "rgba(255,255,255,0.9)",
  padding: "20px",
  borderRadius: "10px"
}}></div>

        <h3>Probable Matching Found Item List</h3>
        <hr style={{ height: "3px", backgroundColor: "red" }} />

        <div className="row">
          <table className="table table-striped table-bordered table-hover">
            <thead>
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
                <th>Select</th>
              </tr>
            </thead>

            <tbody>
              {foundItemDTOList.map((item) => (
                <tr key={item.foundItemId}>
                  <td>{item.foundItemId}</td>
                  <td>{item.foundItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.foundDate}</td>
                  <td>{item.username}</td>
                  <td>Not Returned</td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        claimItem(item.foundItemId, item.username)
                      }
                    >
                      Claim
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BUTTON */}
        <button
          style={{ marginTop: "10px" }}
          onClick={returnBack}
          className="btn-gradient"
        >
          Return
        </button>

        {/* SUCCESS MESSAGE */}
        {flag && (
          <div className="alert alert-success mt-3">
            ✅ Item successfully claimed!
          </div>
        )}

      </div>
    </div>

    {/* FOOTER */}
    <div className="app-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </div>

  </div>
);


};

export default MatchItemSearch;