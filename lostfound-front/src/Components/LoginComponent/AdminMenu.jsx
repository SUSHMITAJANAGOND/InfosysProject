import React from "react";
import {useNavigate} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../Services/LoginService";


const AdminMenu=()=>{

    let navigate=useNavigate();
   const handleLogout = () => {
     logout().then(() => {
           localStorage.clear();
           sessionStorage.clear();
           navigate('/');
       })
    };


    return (
  <div className="admin-page">

    {/* HEADER */}
    <header className="admin-header">
      <h1 className="admin-title">
        Lost & Found Admin Menu
      </h1>
    </header>

    {/* NAVBAR */}
    <div className="admin-navbar-wrapper">
      <Navbar expand="lg" className="admin-navbar">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto">

            <NavDropdown title="Student" id="student-dropdown">
              <NavDropdown.Item href="student-repo">Student List</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Items" id="items-dropdown">
              <NavDropdown.Item href="found-list">Found Item List</NavDropdown.Item>
              <NavDropdown.Item href="/lost-list">Lost Item List</NavDropdown.Item>
              <NavDropdown.Item href="search">Match Item List</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link onClick={() => navigate("/chatting")}>
  Chatting
</Nav.Link>

            <Nav.Link onClick={handleLogout} className="logout-link">
              Logout
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

    {/* IMAGE SECTION */}
    <div className="admin-image-section"></div>

    {/* FOOTER */}
    <footer className="admin-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </footer>

  </div>
);

};
export default AdminMenu;