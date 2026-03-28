import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getUserId } from "../../Services/LoginService";
import { generateFoundId, saveFoundItem } from "../../Services/FoundItemService";

const FoundItemRegistration = () => {

  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState("");
  let [fdate,setFdate]=useState(new Date());
  const [userId, setUserId] = useState("");

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: "",
    status: false,
  });

  useEffect(() => {
    generateFoundId().then(res => setNewId(res.data));
    getUserId().then(res => setUserId(res.data));
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFoundItem(prev => ({ ...prev, [name]: value }));
    setFlag(false);
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }

    if (!foundItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }

    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }

    if (!foundItem.location.trim()) {
      tempErrors.location = "Found location is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      const finalItem = {
        ...foundItem,
        foundItemId: newId,
        username: userId,
        foundDate: fdate,
      };

      saveFoundItem(finalItem).then(() => {
        setFlag(true);
      });
    }
  };

  const clearAll = () => {
    setFoundItem({
      foundItemId: "",
      foundItemName: "",
      color: "",
      brand: "",
      category: "",
      location: "",
      username: "",
      foundDate: "",
      status: false,
    });
    setFdate("");
    setFlag(false);
  };

  return (
  <div className="form-page">

    {/* HEADER */}
    <header className="form-header">
      <h2>Found Item Registration</h2>
    </header>

    {/* MAIN SECTION */}
    <div className="form-wrapper">

      <div className="form-card">

        

        <form onSubmit={handleValidation} className="modern-form">

          <div className="form-row">
            <label>Item ID</label>
            <input className="modern-input" value={newId} readOnly />
          </div>

          <div className="form-row">
            <label>Found Item Name</label>
            <input
              name="foundItemName"
              className="modern-input"
              value={foundItem.foundItemName}
              onChange={onChangeHandler}
            />
            {errors.foundItemName && (
              <span className="error-text">{errors.foundItemName}</span>
            )}
          </div>

          <div className="form-row">
            <label>Category</label>
            <input
              name="category"
              className="modern-input"
              value={foundItem.category}
              onChange={onChangeHandler}
            />
            {errors.category && (
              <span className="error-text">{errors.category}</span>
            )}
          </div>

          <div className="form-row">
            <label>Color</label>
            <input
              name="color"
              className="modern-input"
              value={foundItem.color}
              onChange={onChangeHandler}
            />
            {errors.color && (
              <span className="error-text">{errors.color}</span>
            )}
          </div>

          <div className="form-row">
            <label>Brand</label>
            <input
              name="brand"
              className="modern-input"
              value={foundItem.brand}
              onChange={onChangeHandler}
            />
            {errors.brand && (
              <span className="error-text">{errors.brand}</span>
            )}
          </div>

          <div className="form-row">
            <label>Location</label>
            <input
              name="location"
              className="modern-input"
              value={foundItem.location}
              onChange={onChangeHandler}
            />
            {errors.location && (
              <span className="error-text">{errors.location}</span>
            )}
          </div>

          <div className="form-row">
            <label>Found Date</label>
            <input
              type="date"
              className="modern-input"
              value={fdate}
              onChange={(e) => setFdate(e.target.value)}
            />
          </div>

          {/* BUTTON SECTION */}
          <div className="button-group">
            <button type="submit" className="primary-btn">
              Submit
            </button>

            <button type="button" className="secondary-btn" onClick={clearAll}>
              Clear
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/student-menu")}
            >
              Return
            </button>
          </div>

        </form>

        {flag && (
          <div className="success-box">
            Found Item Submitted Successfully!
          </div>
        )}

      </div>
    </div>

    {/* FOOTER */}
    <footer className="form-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </footer>

  </div>
);
};

export default FoundItemRegistration;