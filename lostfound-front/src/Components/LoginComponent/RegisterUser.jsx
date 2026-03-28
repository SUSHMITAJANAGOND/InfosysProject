import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {registerNewUser} from "../../Services/LoginService";
 import '../../DisplayView.css';
 const RegisterUser=()=>{

    const [lostFoundUser,setLostFoundUser] = useState({
        username:"",
        password: "",
        personalName:"",
        email:"",
        role:"",
    });
  const [flag,setFlag]=useState(false);
  const [confirmPassword,setConfirmPassword]=useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const createNewUser = (event) => {
    event.preventDefault();
       if(lostFoundUser.password===confirmPassword){
         registerNewUser(lostFoundUser).then((response)=>{
          setFlag(true);
         });
    }
 };
    useEffect(() => {
    setFlag(false);
    }, []);


    const  onChangeHandler = (event) =>{
    event.persist();
    setFlag(false);
    const name = event.target.name;
        const value = event.target.value;
       setLostFoundUser(values =>({...values, [name]: value }));
   };
 
   const returnBack=()=>{
    navigate('/');
   }

   const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
 
    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
 
    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    else if (lostFoundUser.password.length < 5 || lostFoundUser.passwordlength > 10) {
       tempErrors.password="Password must be 5-10 characters long";
      isValid = false;
    }
    else if (lostFoundUser.password!==confirmPassword) {
      tempErrors.password="Both the passwords are not matched";
     isValid = false;
   }
 
  if (!lostFoundUser.personalName.trim()) {
        tempErrors.personalName = "Personal Name is required";
        isValid = false;
    }
if (!lostFoundUser.email.trim()) {
        tempErrors.email = "Email is required";
        isValid = false;
      }
      else if(!emailPattern.test(lostFoundUser.email)){
        tempErrors.email = "Invalid Email Format";
        isValid = false;
      }
    if (!lostFoundUser.role.trim()) {
        tempErrors.role = "Role is required";
        isValid = false;
      }
      if (!confirmPassword.trim()) {
        tempErrors.confirmPassword = "Confirm Password is required";
        isValid = false;
      }
 
   setErrors(tempErrors);
    if (isValid) {
        createNewUser(event);
    }
  };


return (
  <div className="register-page d-flex align-items-center justify-content-center">

    <div className="card register-card col-md-5 p-4">

      <div className="card-body">

        <h3 className="text-center fw-bold register-heading">
          New User Registration
        </h3>

        <form>

          <div className="mb-3">
            <label className="fw-semibold">User Name</label>
            <input
              placeholder="Enter username"
              name="username"
              className="form-control modern-input"
              value={lostFoundUser.username}
              onChange={onChangeHandler}
            />
            {errors.username && <small className="text-danger">{errors.username}</small>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control modern-input"
              value={lostFoundUser.password}
              onChange={onChangeHandler}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control modern-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Personal Name</label>
            <input
              placeholder="Enter personal name"
              name="personalName"
              className="form-control modern-input"
              value={lostFoundUser.personalName}
              onChange={onChangeHandler}
            />
            {errors.personalName && <small className="text-danger">{errors.personalName}</small>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Email</label>
            <input
              placeholder="Enter email"
              name="email"
              className="form-control modern-input"
              value={lostFoundUser.email}
              onChange={onChangeHandler}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">Select Role</label>
            <select
              name="role"
              className="form-control modern-input"
              value={lostFoundUser.role}
              onChange={onChangeHandler}
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <small className="text-danger">{errors.role}</small>}
          </div>

          <button
            type="button"
            className="btn btn-gradient w-100 mt-3"
            onClick={handleValidation}
          >
            Register
          </button>

        </form>

        {flag && (
          <div className="text-center mt-3">
            <p className="text-success fw-semibold">
              New User Created Successfully 🎉
            </p>
            <button className="btn btn-success w-100" onClick={returnBack}>
              Go To Login
            </button>
          </div>
        )}

      </div>
    </div>
  </div>
);
  
 };
 export default RegisterUser;