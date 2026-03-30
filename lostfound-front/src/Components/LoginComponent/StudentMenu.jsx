import React from "react";
import {useNavigate} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../Services/LoginService";

const StudentMenu=()=>{

   let navigate=useNavigate();
       const handleLogout = () => {
         logout().then(() => {
               localStorage.clear();
               sessionStorage.clear();
               navigate('/');
           })
        };



  return (
  <div className="student-page">

    {/* HEADER */}
    <header className="student-header">
      <h1 className="student-title">
        Lost & Found Student Menu
      </h1>
    </header>

    {/* NAVBAR */}
    <div className="student-navbar-wrapper">
      <Navbar expand="lg" className="student-navbar">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto">

            <NavDropdown title="Personal" id="personal-dropdown">
              <NavDropdown.Item href="student-show">Personal Details</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Lost Item" id="lost-dropdown">
              <NavDropdown.Item href="/lost-entry">
                Lost Item Form Submission
              </NavDropdown.Item>

              
              <NavDropdown.Item href="/lost-list">
                Lost Item List
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Found Item" id="found-dropdown">
              <NavDropdown.Item href="/found-entry">
                Found Item Form Submission
              </NavDropdown.Item>
              <NavDropdown.Item href="/found-list">
                Found Item List
              </NavDropdown.Item>
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
    <div className="student-image-section"></div>

    {/* FOOTER */}
    <footer className="student-footer">
      © 2026 Lost & Found Locator | All Rights Reserved
    </footer>

  </div>
);

};
export default StudentMenu;