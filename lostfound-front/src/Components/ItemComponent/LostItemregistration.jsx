import React, {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import '../../DisplayView.css';
import {getUserId} from "../../Services/LoginService";
import {generateId,saveLostItem} from "../../Services/LostItemService";


const LostItemRegistration=()=>{
    let navigate = useNavigate();
    const [flag,setFlag]=useState(false);
    const [errors, setErrors] = useState({});
    const [newId,setNewId]=useState("");
    const [ldate,setLdate]=useState(new Date());
    const [userId,setUserId]=useState("");
    const [lostItem, setLostItem]= useState({
        lostItemId :"",
	lostItemName :"",
	color :"",
	brand :"",
	category :"",
	location :"",
	username :"",
	lostDate :new Date(),
	status: false,
    });


    



    const setLostItemId=()=>{
        generateId().then(response=>{
          setNewId(response.data);  
        });
      };
     
      const setUsername=()=>{
        getUserId().then(response=>{
         setUserId(response.data);
        });
       }


    useEffect(() => {
        setLostItemId();
        setUsername();
        setFlag(false);
      }, []);

    const  onChangeHandler = (event) =>{
            event.persist();
            setFlag(false);
            const name = event.target.name;
            const value = event.target.value;
            setLostItem(values =>({...values, [name]: value }));
      };
    
    const lostItemSubmit = (event) => {
        event.preventDefault();
        lostItem.lostItemId=newId;
        lostItem.username=userId;
        lostItem.lostDate=ldate;
          saveLostItem(lostItem).then(response=>{
            setFlag(true);
          });      
      }

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;
   
        if (!lostItem.lostItemName.trim()) {
          tempErrors.lostItemName = "Item Name is required";
          isValid = false;
        }
   
        if (!lostItem.color.trim()) {
          tempErrors.color = "Item color is required";
          isValid = false;
        }
        if (!lostItem.brand.trim()) {
            tempErrors.brand = "Item brand is required";
            isValid = false;
        }
        if (!lostItem.category.trim()) {
            tempErrors.category = "Item category is required";
            isValid = false;
        }
   
        if (!lostItem.location.trim()) {
            tempErrors.location = "Lost Location is required";
            isValid = false;
          }
       setErrors(tempErrors);
        if (isValid) {
          lostItemSubmit(event);
        }
      };


    const returnBack=()=>{
        navigate("/student-menu");  
       }
     
      const nextItem=()=>{
        navigate('/dummy/1');
      }



    /*return(
    <div>
      <br/>
      <div className = ".container">
        <div className = "row">
         <div className = "card col-md-2 offset-md-3 offset-md-3">
            <div className = "login-box">
              <h2 className="text-center"><u>Lost Item Form Submission</u> </h2>
              <form>
                <div className = "form-group">
                  <label>Item Id: </label>
                  <input name="itemId" className="form-control" value={newId}/>
                </div>
                <div className = "form-group">
                    <label>Lost Item Name: </label>
                    <input name="lostItemName" className="form-control" value={lostItem.lostItemName} onChange={(event) => onChangeHandler(event)}/>
                    {errors.lostItemName && <p style={{ color: "red" }}>{errors.lostItemName}</p>}
                </div>
                 <div className = "form-group">
                    <label>Item Category: </label>
                    <input name="category" className="form-control" value={lostItem.category} onChange={(event) => onChangeHandler(event)}/>
                    {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
                </div>
                <div className = "form-group">
                    <label>Item Color: </label>
                    <input name="color" className="form-control" value={lostItem.color} onChange={(event) => onChangeHandler(event)}/>
                    {errors.color && <p style={{ color: "red" }}>{errors.color}</p>}
                </div>
                <div className = "form-group">
                    <label>Item Brand Name: </label>
                    <input name="brand" className="form-control" value={lostItem.brand} onChange={(event) => onChangeHandler(event)}/>
                    {errors.brand && <p style={{ color: "red" }}>{errors.brand}</p>}
                </div>
                <div className = "form-group">
                    <label>Location of Lost Item: </label>
                    <input name="location" className="form-control" value={lostItem.location} onChange={(event) => onChangeHandler(event)}/>
                    {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
                </div>
                <div className = "form-group">
                     <label> Select Lost Date: </label>
                     <input type="date" placeholder="yyyy-mm-dd"  className="form-control" value={ldate} onChange={(event)=>setLdate(event.target.value)}/>  
                </div>
                <br/>
                <div className = "form-group">        
                      <button className='btn btn-primary' onClick={handleValidation}>Submit</button>
                                &nbsp;&nbsp;&nbsp;
                      <button className="btn btn-success" onClick={returnBack}>Return</button>
                </div>
              </form>
              <br/>
               <div>
                  {flag && <p style={{ color: "blue" }}>Lost Item Form Submitted..... <button className='btn btn-warning' onClick={nextItem}>New Form Submission</button></p>}
                </div>
            </div>
         </div>
        </div>
      </div>
    </div>
  );

  */



  return (
  <div className="lost-page">

    {/* HEADER */}
    <header className="lost-header">
      <h1 className="lost-title">
        Lost Item Form Submission
      </h1>
    </header>

    {/* FORM SECTION */}
    <div className="lost-form-wrapper">
      <div className="card lost-card col-md-5 p-4">

        <form>

          <div className="mb-3">
            <label>Item Id</label>
            <input name="itemId" className="form-control" value={newId} readOnly />
          </div>

          <div className="mb-3">
            <label>Lost Item Name</label>
            <input
              name="lostItemName"
              className="form-control"
              value={lostItem.lostItemName}
              onChange={onChangeHandler}
            />
            {errors.lostItemName && <small className="text-danger">{errors.lostItemName}</small>}
          </div>

          <div className="mb-3">
            <label>Item Category</label>
            <input
              name="category"
              className="form-control"
              value={lostItem.category}
              onChange={onChangeHandler}
            />
            {errors.category && <small className="text-danger">{errors.category}</small>}
          </div>

          <div className="mb-3">
            <label>Item Color</label>
            <input
              name="color"
              className="form-control"
              value={lostItem.color}
              onChange={onChangeHandler}
            />
            {errors.color && <small className="text-danger">{errors.color}</small>}
          </div>

          <div className="mb-3">
            <label>Item Brand Name</label>
            <input
              name="brand"
              className="form-control"
              value={lostItem.brand}
              onChange={onChangeHandler}
            />
            {errors.brand && <small className="text-danger">{errors.brand}</small>}
          </div>

          <div className="mb-3">
            <label>Location of Lost Item</label>
            <input
              name="location"
              className="form-control"
              value={lostItem.location}
              onChange={onChangeHandler}
            />
            {errors.location && <small className="text-danger">{errors.location}</small>}
          </div>

          <div className="mb-3">
            <label>Select Lost Date</label>
            <input
              type="date"
              className="form-control"
              value={ldate}
              onChange={(e) => setLdate(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between mt-3">

  <button
    type="button"
    className="btn btn-gradient"
    onClick={handleValidation}
  >
    Submit
  </button>

  <button
    type="button"
    className="btn btn-return"
    onClick={returnBack}
  >
    Return
  </button>

</div>

        </form>

        {flag && (
          <div className="text-center mt-3">
            <p className="text-success fw-bold">
              Lost Item Form Submitted 🎉
            </p>
            <button className="btn btn-warning" onClick={nextItem}>
              New Form Submission
            </button>
          </div>
        )}

      </div>
    </div>

    {/* FOOTER */}
    <footer className="lost-footer">
      © LostFoundApplication2026
    </footer>

  </div>
);


    
     
     
   
 

};
export default LostItemRegistration;