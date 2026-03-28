import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const LoginPage = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [flag, setFlag] = useState(true);

  // Handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFlag(true);
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate login from backend
  const validateLogin = () => {
    validateUser(loginData.username, loginData.password)
      .then((response) => {
        let role = String(response.data);

        if (role === "Admin") {
          navigate("/admin-menu");
        } else if (role === "Student") {
          navigate("/student-menu");
        } else {
          setFlag(false);
        }
      })
      .catch(() => {
        setFlag(false);
      });
  };

  // Frontend validation
  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      validateLogin();
    }
  };

  const registerNewUser = () => {
    navigate("/register");
  };

  return (
  <div className="login-page d-flex align-items-center justify-content-center">

    <div className="card login-card col-md-5 p-4">

      <div className="card-body">

        <h3 className="text-center fw-bold login-heading">
          Welcome
        </h3>
        <h4 className="text-center fw-bold login-subheading">
          Login to Lost & Found System
        </h4>

        <form onSubmit={handleValidation}>

          <div className="form-group mb-3">
            <label className="fw-semibold">User Name</label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              className="form-control modern-input"
              value={loginData.username}
              onChange={onChangeHandler}
            />
            {errors.username && (
              <small className="text-danger">
                {errors.username}
              </small>
            )}
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control modern-input"
              value={loginData.password}
              onChange={onChangeHandler}
            />
            {errors.password && (
              <small className="text-danger">
                {errors.password}
              </small>
            )}
          </div>

          {/* ✅ Buttons Section */}
          <div className="d-flex gap-3 mt-3">
            
            <button type="submit" className="btn btn-gradient flex-fill">
              Login
            </button>

            <button
              type="button"
              className="btn btn-gradient flex-fill"
              onClick={registerNewUser}
            >
              Register New User
            </button>

          </div>

        </form>

        {/* ❌ Login Failed Section */}
        {!flag && (
          <div className="text-center mt-3">
            <p className="text-danger fw-semibold">
              User does not exist or Invalid Password
            </p>
          </div>
        )}

      </div>
    </div>
  </div>
);
};

export default LoginPage;
