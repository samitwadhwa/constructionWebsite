import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import MainSideBar from '../components/MainSideBar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import LoadingSpinner from '../components/LoadingSpinner';
import AddIcon from '@mui/icons-material/Add';

import Axios from 'axios';
import Header from '../components/header';
import EditModal from '../components/EditModal';
import AuthContext from '../../Context/AuthProvider';
import axios from 'axios';
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

  const [alerts, setAlerts] = useState(null);
  const navigate = useNavigate();

  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const token = localStorage.getItem('token');
  const GetData = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/team/get-team`, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then(async (result) => {
        setTeam(result.data.data);
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
    top: '-4.5rem',
    height: '1rem',
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
  const myTask = {
    fontSize: '1rem',
    marginLeft: '-2.4rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const myAnalytics = {
    fontSize: '1rem',
    marginLeft: '-3.5rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const Switch = () => {
    navigate('/clients');
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
  const MoveProject = () => {
    navigate('/Project');
  };
  const EditMember = ({ data }) => {
    return (
      <ModeEditOutlineIcon
        disabled={auth.role !== 'Admin'}
        style={{
          marginTop: '-0.5rem',
          marginLeft: '-1rem',
          cursor: 'pointer',
          opacity: auth.role === 'Admin' ? '1' : '0.5',
        }}
        onClick={(e) => {
          setModalData({
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password,
            id: data._id,
          });
          setEditModalOpen(true);
        }}
      />
    );
  };

  const DeletePost = (id) => {
    setIsLoading(true);
    Axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/team/delete-team/${id}`,
      { headers: { authorization: `Bearer: ${token}` } }
    ).then((result) => {
      console.log(result);

      setIsLoading(false);
      showAlerts('Deleted successfully!', 'success');

      window.location.reload(false);
      // console.log(user);
    });
  };

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
                      role: null,
                      password: null,
                      id: null,
                    });
                    setEditModalOpen(true);
                  }}
                  disabled={auth.role !== 'Admin'}
                >
                  <AddIcon style={myAdd} />
                  Add new member
                </button>
              )}
            </div>
            <h3
              className='my-4'
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: '800',
              }}
            >
              Team members
            </h3>

            <h3
              style={mySetting2}
              className={
                toggleUpdateState === 6
                  ? 'tabs-update-client active-update-tabs'
                  : 'tabs-update-client'
              }
              onClick={() => Switch()}
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
                    Role
                  </th>
                  {/* <th scope="col">Department</th> */}
                  <th scope='col'></th>
                </tr>
              </thead>

              {team.map((member) => (
                <tbody>
                  <tr>
                    <button style={myAccount}>
                      {member.name.charAt(0).toUpperCase()}{' '}
                    </button>

                    <td style={MyTd}>{member.name}</td>
                    <td style={MyTd}>{member.role}</td>
                    {/* <td>{member.department}</td> */}
                    <td>
                      <EditMember data={member} />

                      <DeleteOutlineIcon
                        style={myDelete}
                        disabled={auth.role !== 'Admin'}
                        onClick={() => {
                          if (
                            window.confirm(
                              'Do you Really want to Delete Team member?'
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

          <EditModal
            open={editModalOpen}
            setOpen={setEditModalOpen}
            Data={modalData}
          />
        </div>
      </div>
    </div>
  );
}
