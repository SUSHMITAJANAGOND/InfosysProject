import React, {useState,useEffect} from "react";
import {useNavigate,useParams} from 'react-router-dom';
import '../../DisplayView.css';
import {getLostItemById} from "../../Services/LostItemService";
import { getFoundItemsByLostItem}  from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";


const MatchItemSearch=()=>{
    let navigate = useNavigate();
    const param=useParams();
    const [flag,setFlag]=useState(false);
    
    const [lostItem, setLostItem]= useState({
        lostItemId :"",
        lostItemName :"",
        color :"",
        brand :"",
        category :"",
        location :"",
        username :"",
        lostDate:"",
        status:false,
    });

  const[foundItemDTOList,setFoundItemDTOList] = useState([]);

  const[matchItem,setMatchItem]=useState({
      lostItemId :"",
      foundItemId:"",
      itemName:"",
      category:"",
      lostUsername:"",
      foundUsername:"",
  });


    const showFoundItems=()=>{
      getLostItemById(param.pid).then((response)=>{
        setLostItem(response.data);
      });

      getFoundItemsByLostItem(param.pid).then((response)=>{
        setFoundItemDTOList(response.data);
      });
      
    }

    useEffect(()=>{
      showFoundItems();
    }, []);


    const returnBack=()=>{
      navigate('/lost-list');
    }

    const claimItem=(foundItemId,foundUser)=>{
      matchItem.lostItemId=lostItem.lostItemId;
      matchItem.foundItemId=foundItemId;
      matchItem.itemName=lostItem.lostItemName;
      matchItem.category=lostItem.category;
      matchItem.lostUsername=lostItem.username;
      matchItem.foundUsername=foundUser;

      saveMatchItem(matchItem).then((response)=>{
        setFlag(true);
      });

    }
    

   return(
  <div className="text-center">
    <div>
    <h2 className="text-center">Student's Lost Item</h2>
      <div className = "row">
       <table className = "table table-striped table-bordered">
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
       </div>

        <br/>

        <div>  
        <h2 className="text-center">Probable Matching Found Item List</h2>
        <hr style={{height: "3px", borderWidth:0, color:"yellow", backgroundColor:"red"}}></hr>

        <div className = "row">
          <table className = "table table-striped table-bordered">

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
            {
                foundItemDTOList.map((item,index)=>(
                    <tr key={item.foundItemId}>
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
                          style={{marginLeft: "10px"}}
                          className="btn btn-warning"
                          onClick={()=>claimItem(item.foundItemId,item.username)}
                          >
                          Claim
                          </button>
                        </td>

                    </tr>
                )) 
            }
        </tbody>

        </table>

        <br/>

        <div className = "form-group">  
      <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>    
     </div>  

    </div>

      {flag && <p style={{ color: "blue" }}> Item Claimed .....</p>}

  </div>
 </div>
      
   
 );
};

export default MatchItemSearch;