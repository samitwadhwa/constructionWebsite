// import { positions } from '@mui/system';
// import { border } from '@mui/system';
import React, { Component, useState } from 'react'
// import PropTypes from 'prop-types'
import './style.css'
import { useNavigate } from 'react-router-dom';

export default function AddTask({ title = "", location, size, id, completed, term,uID}) {
  console.log("completed", completed)
  const myCards = {
    display: 'flex',
    minWidth: "18rem",
    maxWidth:'22rem',
    borderRadius: '10px'
  }
  const navigate = useNavigate();
  const myProjectTitleText = {
    fontSize: '0.9rem',
    fontWeight: '500',
    color:'#7B931B'
  }
  const myTitle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "700"
  }
  const myText = {
    marginTop: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    position: "relative",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "600",
    color: "#8B8B8B",
    fontSize: "0.9rem",
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
  const myTextC = {
    marginTop: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    position: "absolute",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "600",
    color: "#8B8B8B",
    fontSize: "0.9rem",
    width: 'unset',
    height: 'unset',
  }
  const myBTN = {
    marginTop: "3rem",

    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "center",
    color: "white",
    marginLeft: "-1.1rem",
    borderRadius: "10px",
    background: "#7B931B",
    border: "0px",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "700",
    cursor: "pointer",
    position: "relative",
    width: "91%"
  }

  const myBody = {
    boxShadow: "0px 4px 12px rgb(0 0 0 / 25%)",
    borderRadius: "10px",
    padding: "23px 26px"
  }
  return (

    <div className="card" style={myCards}>

      <div style={myBody} className="card-body">
        <div>
          <h5 style={myProjectTitleText}>{ uID}</h5>
        </div>
        <div >
          <h4 style={myTitle} className="card-title"><b>{title}</b></h4>

        </div>

        <div>
          <p style={myText} className="card-text"><img src={require("../../../Assets/location-Icon.png")} /> {location}</p>
          <p style={myText} className="card-text"><img src={require("../../../Assets/area-Icon.png")} /> {size} sq. ft</p>
        </div>
        {completed && <p style={myTextC} className="card-text">Completed</p>}

        <div style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <button href="#" style={myBTN} className="btn btn-sm btn-dark" onClick={() => navigate(`/projects/${id}`)}>View Project</button>
        </div>
        {/* btn-sm for small size of buttons */}
      </div>
    </div>


  )
}



