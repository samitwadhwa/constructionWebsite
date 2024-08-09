// import { positions } from '@mui/system';
// import { border } from '@mui/system';
import React, { Component, useState } from 'react'
// import PropTypes from 'prop-types'
import './style.css'
import LoadingSpinner from "../../components/LoadingSpinner";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";
import AuthContext
  from "../../../Context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useContext } from "react";
import env from "react-dotenv";
import SummarizeIcon from '@mui/icons-material/Summarize';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';


export default function AddTask({ title = "", location, size, id, description, type, deadLine, name, url }) {

  const { auth, setAuth } = useContext(AuthContext);
  const [project, setProject] = useState({});
  const [Document, setDocument] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const myDelete = {
    marginTop: "-5.8rem",
    marginLeft: "18.6rem",
    color: "#F35959",
    cursor: "pointer"
  }

  const myDeleteDis = {
    marginTop: "-5.8rem",
    marginLeft: "18.6rem",
    color: "white",
    // cursor: "pointer"
  }
  const myCards = {
    width: "22rem",


  }
  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects/get-project/${id}`, { headers: { authorization: `Bearer: ${token}` } }).then(res => {
  //     console.log(res.data)
  //     setProject(res.data.data)
  //     setDocument(res.data.data);
  //   }).catch(err => {
  //     console.log(err)
  //   }
  //   )
  // }, [id])
  //  console.log(Document)
  const DeletePost = async (projId, fileId) => {
    setIsLoading(true);
    if (window.confirm('Do you Really want to mark as delete?')) {
      console.log(fileId)
      axios.delete(`${process.env.REACT_APP_BASE_URL}/api/projects/${projId}/delete-file/${fileId}`, { headers: { authorization: `Bearer: ${token}` } })
        .then((result) => {
          window.location.reload(false);
          console.log(result.data)
          setIsLoading(false);
          // console.log(user);
        }).catch((error) => {
          console.log(error);
        })
    }
  }

  const navigate = useNavigate();
  const myTitle = {

    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    fontWeight: "400",
    // color: "white",
    // border: "1px solid #768C15",
    padding: "11px 65px",
    width: "22.1rem",
    marginLeft: "-1.4rem",
    cursor: "pointer",
    marginTop: "-1.3rem",
    borderRadius: "9px",
    // backgroundColor: "#768C15",
  }
  const myText = {
    marginTop: "-2rem",
    fontFamily: "'Montserrat', sans-serif",
    position: "relative",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem"
  }
  const myText1 = {
    marginTop: "1rem",

    fontFamily: "'Montserrat', sans-serif",
    position: "relative",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "600",

    fontSize: "0.9rem"
  }
  const myBTN = {
    marginTop: "3rem",

    fontSize: "1.2rem",
    color: "white",
    background: "#7B931B",
    border: "0px",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "700",
    cursor: "pointer",
    position: "relative",
    width: "80%"
  }
  const myWork = {
    width: "3rem",
    borderRadius: "1rem",
    color: "white",

    backgroundColor: "#7B88FF"
  }
  const myDead = {
    color: "#F4617B",
  }
  const myWork1 = {
    width: "3rem",
    borderRadius: "1rem",
    color: "white",

    backgroundColor: "#FF7BEA"
  }
  const myWork2 = {
    width: "3rem",
    borderRadius: "1rem",
    color: "white",

    backgroundColor: "#F1AD46"
  }
  const myCheck = {
    color: "rgb(118, 140, 21)",
    fontSize: "1.2rem",
    marginTop: "-2px"
  }
  const myComplete = {
    marginTop: "-2.5rem",
    marginLeft: "10rem",
    color: "#768C15",
    fontSize: "0.9rem",
    cursor: "pointer"
  }

  const myBody = {
    boxShadow: "0px 4px 12px rgb(0 0 0 / 25%)",
    borderRadius: "10px",
    height: "0rem"
  }
  const docName = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '13rem',
    cursor: "pointer",
    display: 'inline-block'
  };
  return (
    <div>

      <div className="card my-3" style={myCards}>

        <div style={myBody} className="card-body">
          <div>
            <h4 style={myTitle} className="card-title"><SummarizeIcon style={{
              marginLeft: "-3.4rem", position: "absolute",
              color: "#D4E58A"
            }} /><b style={docName} onClick={() => window.location.assign(url)}>{title}</b></h4>
            {/* {console.log(Document.fileUrl.split(".com/")[1])} */}

            <DeleteOutlineIcon style={myDelete} onClick={() => { console.log(console.log(url)); DeletePost(id, url.toString().split(".com/")[1]) }} />
            {/* {isLoading ? <LoadingSpinner/> : null} */}

            {/* {console.log( Document.fileUrl.slice(4,16))} */}
          </div>

        </div>
      </div>

    </div>
  )
}



