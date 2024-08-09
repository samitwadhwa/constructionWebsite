// import { positions } from '@mui/system';
// import { border } from '@mui/system';
import React, { Component , useState } from 'react'
// import PropTypes from 'prop-types'
import './style.css'
import { useNavigate } from 'react-router-dom';


export default function AddTask({title }) {
  
 
    

    const myCards = {
   
    height: "157px",
    width: "594px",
    // background-blend-mode: pa;
    left: "40.9rem",
    top: "-33rem",
    borderRadius: "14px"  

}
const navigate = useNavigate();
const myTitle = {
  display: "flex",
  // justifyContent:"center",
  color: "red",
  marginLeft: "4rem",
     fontFamily: "'Montserrat', sans-serif",
}




   const myBody = {
    boxShadow: "0px 4px 12px rgb(0 0 0 / 25%)",
    borderRadius:"10px"
   }
  
    return (
      <div>
          
        <div  className="card my-3" style={myCards}>
        
          <div  style={myBody} className="card-body">
          <h4 style={myTitle} className="card-title">{title}</h4>
        

          <div style={{display:"flex", justifyContent:"center", flexGrow:1}}>
          </div>
          </div>
          </div>

      </div>
    )
  }
  


