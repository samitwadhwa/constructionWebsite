
import React, { useState, useEffect,useContext } from "react";
// import SearchIcon from '@mui/icons-material/Search';
// import proj_styles from './styles/Project.module.css';
import '../styles/style.css'
// import AddIcon from '@mui/icons-material/Add';
// import Cards from './components/Cards';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from '../components/header';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./leave.css"
// import EditModel from "../components/EditModal";
// import AddModal from "./components/AddModal";
// import ProjectModal from "./components/ProjectModal";
import AuthContext
from "../../Context/AuthProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ModalLeave from "../Leave Request/ModalLeave";
//import sidebar component
import MainSideBar from '../components/MainSideBar'



export default function AddTask() {
    const [row, setRow] = useState([]);
    const { auth, setAuth } = useContext(AuthContext);
    const [ModalLeaveOpen, setModalLeaveOpen] = useState(false);
    const navigate = useNavigate()
    // const[row , setRow] = useState([]); 
    const[show , setShow] = useState(false);
    const [searchTerm, setsearchTerm] = useState("");

    const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };


  const token = localStorage.getItem("token");
  const myHeadingLeave = {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "94.3%",
    marginTop:" 3%",
    // height : "4rem"
    // marginLeft: "6%"
  }
  const Footer = () => {
    return <div></div>;
  };
  const showHistory = (e) => {
    e.preventDefault() 
    setShow(true);
  }
  const navigateTo = (e) => {
   window.location.reload()
  }
  const onInput = {
    width: "74.6rem",
    padding: "4px 6px",
    borderRadius: "5px",
    border: "2px solid #D7EB8B",
    color: "#A8A8A8",
    backgroundColor: "#ffff",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "400",
    marginBottom : "1rem"
  }
const MyShowDiv = {
    display: "flex",
    flexDirection: "column",
    textAlign: "end",
    justifyContent : "space-between",
    height: "8rem"
}
const GetData = () => {

  axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/api/leave-request/`,
      { headers: { authorization: `Bearer: ${token}` } }
    )
    .then((res) => {
      console.log(res.data);
      const rowData = [];
      res.data.data.map((item) => {
        rowData.push({
          id: item._id,

          userName: item.userName,
          startDate: item.startDate.slice(0,10),
          endDate: item.endDate.slice(0,10),
          days: item.days,
          reason: item.reason,
          status: item.status
        });
      });
      setRow(rowData)
      console.log(rowData)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  console.log(row);

useEffect(() => {
  GetData();
}, []);
if(auth.role === "Admin"){

  var columns = [
      
      { field: '_id', headerName: 'SI.no', width: 95 },
      { field: 'userName', headerName: 'Name', width: 233 },
      { field: 'startDate', headerName: 'From', width: 233 },
      { field: 'endDate', headerName: 'To', width: 168},
      { field: 'days', headerName: 'No. of Days', width: 233 },
      { field: 'reason', headerName: 'Reason', width: 233 },
      // { field: 'status', headerName: 'Status', width: 233 },

  ];

}
else{
  var columns = [
  
    { field: '_id', headerName: 'SI.no', width: 95 },
    { field: 'userName', headerName: 'Name', width: 233 },
      { field: 'startDate', headerName: 'From', width: 233 },
      { field: 'endDate', headerName: 'To', width: 168},
      { field: 'days', headerName: 'No. of Days', width: 233 },
      { field: 'reason', headerName: 'Reason', width: 233 },
    { field: 'status', headerName: 'Status', width: 233 },

];

}
  return (
    <div>
      <Header />
      <div className="Updates">

        <MainSideBar sideState={5}/>
        
        <div className="content-tabs" style={{ width: "91rem" }}>
      <div  className="heading-Leave" style={myHeadingLeave} >
       {show ?
       <div  
       style={{
        display: "flex",
        marginLeft: "2.7rem"
       }}
       >

       <ArrowBackIcon/>
        <h6
        style={{width: "11rem"}}
        onClick={(e) => navigateTo(e)} >
          Leave request history</h6>
       </div> 
           : <h6>Leave request</h6> } 
        <div className="show-apply" style={MyShowDiv}>
       {!show ? 
       <button  
        
       className="apply-button"
        onClick={
          () => {
            setModalLeaveOpen(true);   
        }  
        }
        >Apply for leave</button> : null}
   
  {!show && auth.role === "Admin" ? <h6 
       onClick={(e) => showHistory(e)}
       >show history</h6> : null } 
        </div>
        </div>
        <div style={{ marginLeft: '46px', marginRight: '22px', flexGrow: 1 
        ,
        width: "1195px",
        height: "538px",
        overflowX: "none" 
    }}>

          {/* { !show && auth.role === "Admin" ?  
         <div className="checkicons">
    
         <CheckCircleIcon 
          style={{color: "#7B931B"}}
          />
         <CancelIcon 
         style={{color: "#FF5B5B"}}
         />
         </div> : null 
        }          */}
        <Box sx={{ width: 1 }} style={{ background: 'white' }}>
              
              <Box sx={{ height: '80vh', width: 1, mb: 2 }}>
                  {show ? <div  
                  style={{
                    display: "block",
                    margin: "auto",
                 
                  }}
                  >
                          <input style={onInput} type="text" placeholder="search by name" 
                          
                          onChange={(event) => {
                            setsearchTerm(event.target.value);}}
                            /><SearchIcon style={{ color: "#A8A8A8",
                            marginLeft : "-26px"
                            }} /> 

                        </div> : null}
                        {/* {console.log(row)} */}

                <div   
                 style={{
                  height : "35rem"
                 }}
                 >
                {row.filter((val) => {
                  if (searchTerm == "") {
                    return val
                  }
                  else if (val.userName.toLowerCase().search(searchTerm.toLowerCase()) === 0) {
                    return val
                  }
                }).map((val, key) =>

                
                <DataGrid
                // className="columns"
                  columns={columns}
                  rows = {row}
                  components={{
                    Footer: Footer,
                  }}
                />
                )}
                  </div>              
                  {/* {row.map(() => {
 { !show && auth.role === "Admin" ?  
 <div className="checkicons">

 <CheckCircleIcon

  style={{color: "#7B931B"}}
  />
 <CancelIcon 
 style={{color: "#FF5B5B"}}
 />
 </div> : null 
}         

                  })} */}
                {/* <DataGrid
                // className="columns"
                  columns={columns}
                  rows = {row}
                  components={{
                    Footer: Footer,
                  }}
                /> */}
              </Box>
            </Box>
        </div>
        <ModalLeave
              open={ModalLeaveOpen}
              setOpen={setModalLeaveOpen}
            //   Data={modalData}
            />

        </div>

        </div>

    </div>
  );
}
