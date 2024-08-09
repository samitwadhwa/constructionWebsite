import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import LoadingSpinner from '../components/LoadingSpinner';
import AddIcon from '@mui/icons-material/Add';
import MainSideBar from '../components/MainSideBar';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Axios from 'axios';
import EditClient from './components/EditClient';
import Header from '../components/header';
// import EditModal from "./EditModal";
import AuthContext from '../../Context/AuthProvider';
import axios from 'axios';
// import env from "react-dotenv";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
  useLocation,
} from 'react-router-dom';

import AlertTeam from './components/AlertTeam';
// import { Switch } from "@mui/material";
export default function Teams(Item) {
  const { auth, setAuth } = useContext(AuthContext);
  const myAccount = {
    backgroundColor: 'rgb(123, 147, 27)',
    /* border: 2px solid; */
    color: 'white',
    padding: '0.5rem 1rem',
    marginTop: ' 0.4rem',
    /* padding: 0.3rem 1rem; */
    borderRadius: '8rem',
  };
  const myDelete = {
    color: '#e02626',
    marginTop: '-0.5rem',
    cursor: 'pointer',
    marginLeft: '1rem',
  };
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleUpdateState, setToggleUpdateState] = useState(1);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [team, setTeam] = useState([]);

  // const [userId, setuserId] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [Delete, setDelete] = useState("");
  // const [Delete, setDelete] = useState([]);
  const [alerts, setAlerts] = useState(null);
  const navigate = useNavigate();

  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const token = localStorage.getItem('token');
  const GetData = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/client/get-client`, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then(async (result) => {
        setTeam(result.data.data);
        console.log(result);
        setIsLoading(false);
      });
  };
  const myLogout = {
    fontSize: '1rem',
    marginLeft: '-4.1rem',
    marginBottom: '21rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const myVC = {
    fontSize: '1rem',
    marginLeft: '-3.6rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const myVC9 = {
    fontSize: '1rem',
    marginLeft: '-4.2rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const myTeam = {
    fontSize: '1rem',
    marginLeft: '-4.3rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const mySetting = {
    fontSize: '1rem',
    marginLeft: '-2.6rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    // width: "12.5rem"
  };
  const mySetting2 = {
    fontSize: '1.7rem',
    marginLeft: '15.4rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    top: '-4.5rem',
    height: '0rem',
    // width: "12.5rem"
  };
  const mySettingIcon = {
    marginLeft: '-2.1rem',
    position: 'absolute',
  };
  const myTeamIcon = {
    position: 'absolute',
    marginLeft: '-2.1rem',
  };
  const Switch = () => {
    navigate('/Teams');
  };
  const myLogIcon = {
    marginLeft: '-2rem',
    position: 'absolute',
  };
  const myTechIcon = {
    marginLeft: '-2.1rem',
    marginTop: '0rem',
    position: 'absolute',
  };
  const myTechIcon9 = {
    marginLeft: '-2.4rem',
    marginTop: '0rem',
    position: 'absolute',
  };
  const myContent4 = {
    // marginBottom : "-18rem",
    marginTop: '1rem',
    height: '45.7rem',
  };
  const myProjectBtn = {
    // clear: "both",
    // display: "inline-block",
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    // marginTop: "-3rem",
    position: 'relative',
    top: '8rem',
    /* display: flex; */
    borderRadius: '10.2943px',
    padding: '0.4rem 1.5rem',
    marginLeft: '0rem',
    backgroundColor: 'white',
    color: 'rgb(123, 147, 27)',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '800',
    opacity: auth.role === 'Admin' ? '1' : '0.5',
  };
  const myAdd = {
    // fontSize: "small",
    marginLeft: '-1rem',
    marginTop: '-0.3rem',
    marginRight: '0.3rem',
    color: 'white',
    /* padding: 8px 1px; */
    borderRadius: '15px',
    backgroundColor: 'rgb(123, 147, 27)',
  };
  const toggleTab = (index) => {
    // setshow(true)
    setToggleUpdateState(index);
    console.log(toggleUpdateState);
  };
  const Logout = () => {
    navigate('/');
  };
  const MoveProject = () => {
    navigate('/Project');
  };
  const EditMember = ({ data }) => {
    // console.log(data.p)
    console.log(data.name);

    return (
      <ModeEditOutlineIcon
        disabled={auth.role !== 'Admin'}
        style={{
          marginTop: '-0.5rem',
          left: '6rem',
          position: 'relative',
          cursor: 'pointer',
          opacity: auth.role === 'Admin' ? '1' : '0.5',
        }}
        onClick={(e) => {
          setModalData({
            name: data.name,
            email: data.email,
            id: data._id,
            project: data.project,
          });
          setEditModalOpen(true);
        }}
      />
    );
  };

  // const GetID = () => {
  //   Axios.get("http://localhost:5000/_id").then(async (result) => {
  //     setuserId(result.data);
  //   });

  // };
  // const navigate = useNavigate()
  const DeletePost = (id) => {
    // setIsLoading(true);
    // console.log("Samit")
    // console.log(`${process.env.REACT_APP_BASE_URL}/api/client/delete-client/${id}`)
    Axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/client/delete-client/${id}`,
      { headers: { authorization: `Bearer: ${token}` } }
    )
      .then((result) => {
        console.log(result);

        // setIsLoading(false);
        // showAlerts("Deleted successfully!", "success")

        window.location.reload(false);
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const EditPost = (id) => {

  //   Axios.post(`${process.env.REACT_APP_BASE_URL}/api/team/update-team/${id}`,  {headers: { authorization: `Bearer: ${token}` } }, {
  //      id:id,
  //     "email" : Item.email,
  //     "password" : Item.password,
  //     "role" : Item.role,
  //     "name" : Item.name,
  //     "department" : Item.department
  //   }).then((result) =>{
  //     console.log(result)
  //     showAlerts("Task Edited Successfully!", "success");
  //     window.location.reload(false);

  //   })

  // }

  const MyTd = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
  };
  const myTh = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
  };

  // This function will called only once
  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className='Updates'>
          <MainSideBar sideState={3} />

          <div className='container'>
            <div
              className={
                toggleUpdateState === 1 ? 'content  active-content' : 'content'
              }
              style={myContent4}
            >
              <div>
                {auth.role !== 'Admin' || (
                  <button
                    style={myProjectBtn}
                    onClick={() => {
                      setModalData({
                        name: null,
                        email: null,
                        id: null,
                        project: null,
                      });
                      setEditModalOpen(true);
                    }}
                    disabled={auth.role !== 'Admin'}
                  >
                    <AddIcon style={myAdd} />
                    Add new client
                  </button>
                )}
              </div>
              <h3
                className='my-4'
                onClick={() => Switch()}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  cursor: 'pointer',
                }}
              >
                Team members
              </h3>

              <h3
                style={{ ...mySetting2, fontWeight: '800' }}
                className={
                  toggleUpdateState === 6
                    ? 'tabs-update active-update-tabs'
                    : 'tabs-update'
                }
              >
                Clients
              </h3>

              <AlertTeam alerts={alerts} />
              <table class='table container'>
                <thead>
                  <tr>
                    <th></th>
                    <th style={myTh} scope='col'>
                      Name
                    </th>
                    <th style={myTh} scope='col'>
                      Email
                    </th>
                    <th style={myTh} scope='col'>
                      Mobile Number
                    </th>

                    {/* <th scope="col">Department</th> */}
                    <th scope='col'></th>
                  </tr>
                </thead>
                {/* {isLoading ? <LoadingSpinner/> : null} */}

                {team.map((member) => (
                  <tbody>
                    <tr>
                      <button style={myAccount}>
                        {member.name.charAt(0).toUpperCase()}{' '}
                      </button>

                      <td style={MyTd}>{member.name}</td>
                      <td style={MyTd}>{member.email}</td>
                      <td style={MyTd}>{member.password}</td>

                      {/* <td>{member.department}</td> */}
                      <td>
                        <EditMember data={member} />
                        {console.log(member._id)}

                        <DeleteOutlineIcon
                          style={myDelete}
                          disabled={auth.role !== 'Admin'}
                          onClick={() => {
                            if (
                              window.confirm(
                                'Do you really want to delete client?'
                              )
                            ) {
                              DeletePost(member._id);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              {isLoading ? <LoadingSpinner /> : null}
            </div>

            <EditClient
              open={editModalOpen}
              setOpen={setEditModalOpen}
              Data={modalData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//   return (
{
  /* {users.map(user => {
  })} */
}
//     <tr >
//     <td><AccountCircleIcon style={myAccount}/> </td>
//     <td>{user.first_name}</td>
//     <td>{user.chatid}</td>
//     <td>
//     <button  type="submit" className="btn  mt-4 mx-4" onClick={() =>{if(window.confirm('Do you Really want to Delete ?')){DeletePost(user._id)};}}  >
//     {/* <link to="" refresh="true"> */}

//     <DeleteOutlineIcon style={myDelete}  />
// </button>
//     </td>
//   </tr>);
