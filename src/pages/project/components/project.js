import React, { useState, useEffect, useContext } from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ProjectModal from './ProjectModal';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { useParams } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Header from '../../components/header';
import AuthContext from '../../../Context/AuthProvider';
import SiteDocuments from '../SiteDocuments';
import { useNavigate } from 'react-router-dom';
import SiteUpdates from '../siteUpdates';
import PurchaseReq from '../PurchaseReq';

import { IconButton } from '@mui/material';
import ProjectSideBar from './ProjectSideBar';

export default function Project({ match }) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const [isLoading, setIsLoading] = useState(true);
  const [projLoading, setProjLoading] = useState(true);

  const { id } = useParams();
  const { auth, setAuth } = useContext(AuthContext);
  console.log(match);
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const [project, setProject] = useState([]);

  const toggleTab = (index) => {
    // setshow(true)
    setToggleUpdateState(index);
    console.log(toggleUpdateState);
  };
  const Logout = () => {
    navigate('/');
  };

  const token = localStorage.getItem('token');

  const DeletePost = (id) => {
    // setIsLoading(true);

    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/projects/delete-project/${id}`,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((result) => {
        console.log(result);

        setIsLoading(false);
        showAlerts('Deleted successfully!', 'success');
        navigate('/Project');
        // window.location.reload(false);
        // console.log(user);
      });
  };

  const markComplete = () => {
    console.log(token);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/projects/project-completed/${id}`,
        {},
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((result) => {
        console.log(result);

        setIsLoading(false);
        // showAlerts("Deleted successfully!", "success")
        navigate('/Project');
        // window.location.reload(false);
        // console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const content = {
    background: 'rgba(118, 123, 106, 0.1)',
    width: '100%',
    height: '95vh',
  };
  const myComplete = {
    backgroundColor: '#656a66',
    marginTop: '0rem',
    padding: '10px 18px',
    color: 'white',
    borderRadius: '10px',
    /* right: 2rem; */
    width: '11rem',
    marginRight: '1rem',
  };
  const projectSideBar = {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    flexDirection: 'column',
  };

  const navigate = useNavigate();
  useEffect(() => {
    setProjLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/projects/get-project/${id}`, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setProject(res.data.data);
        setProjLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      {/* This one is to display the side navbars  */}
      <Header />
      <div style={{ display: 'flex' }}>
        <ProjectSideBar id={id} />
        {/* For displaying project analysis */}
        <div
          style={content}
          className={
            toggleUpdateState === 1 ? 'content active-content' : 'content'
          }
        >
          <div
            style={{
              flexGrow: 1,
              marginTop: '1rem',
              justifyContent: 'space-between',
              display: 'flex',
              marginLeft: '29px',
              marginRight: 20,
              maxHeight: '4rem',
            }}
          >
            <h2 style={{ width: '5rem' }}>
              <p style={{ width: '16rem' }}>Project Analytics</p>
            </h2>
            <button
              type='submit'
              className='markComplete'
              disabled={auth.role !== 'Admin'}
              style={{
                marginLeft: '37rem',
                opacity: auth.role === 'Admin' ? '1' : '0.6',
              }}
              onClick={() => {
                if (
                  window.confirm('Do you Really want to Delete this Project?')
                ) {
                  DeletePost(project._id);
                }
              }}
            >
              Delete This Project
            </button>
            {project.completed ? (
              <div style={{ textAlign: 'center' }}>
                <h6 style={myComplete}>Completed</h6>
              </div>
            ) : (
              <button
                className='markComplete'
                style={{ opacity: auth.role === 'Admin' ? '1' : '0.6' }}
                disabled={auth.role !== 'Admin'}
                onClick={() => {
                  if (
                    window.confirm(
                      'Do you Really want to mark this project as completed?'
                    )
                  ) {
                    markComplete(project._id);
                  }
                }}
              >
                Mark as complete
              </button>
            )}
          </div>
          {projLoading ? (
            <LoadingSpinner h='100%' />
          ) : (
            <div className='col-md-4'>
              <div
                className='card'
                style={{
                  width: '90%',
                  margin: 10,
                  height: 'fit-content',
                  background: 'white',
                  borderRadius: '10px',
                  padding: 16,
                  marginBottom: '25px',
                }}
              >
                <div
                  className='Card-header'
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h4 style={{ marginBottom: '0' }}>Site Details</h4>
                  <IconButton
                    onClick={(e) => {
                      setProjectModalOpen(true);
                    }}
                    disabled={auth.role !== 'Admin'}
                  >
                    <ModeEditOutlineIcon
                      style={{ opacity: auth.role === 'Admin' ? '1' : '0.5' }}
                    />
                  </IconButton>
                </div>
                <div
                  className='Card-header'
                  style={{
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <label>Site name</label>
                    <br />
                    <h5>{project.site_name}</h5>
                  </div>
                </div>
                <div
                  className='Card-header'
                  style={{
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <label>Site ID</label>
                    <br />
                    <h5>{project.uid}</h5>
                  </div>
                </div>
                <div className='Card-header' style={{ marginTop: '8px' }}>
                  <label>Location</label>
                  <br />
                  <h5>{project.location}</h5>
                </div>
                <div className='Card-header' style={{ marginTop: '8px' }}>
                  <label>Size (sq. ft)</label>
                  <br />
                  <h5>{project.size}</h5>
                </div>
              </div>

              <div
                className='card'
                style={{
                  width: '90%',
                  margin: 10,
                  height: 'fit-content',
                  background: 'white',
                  borderRadius: '10px',
                  padding: 18,
                }}
              >
                <div className='Card-header' style={{ display: 'flex' }}>
                  <h4>Team Assigned</h4>
                </div>
                {!project.team ||
                  project.team.map((member, index) => {
                    return (
                      <div
                        className='Card-header'
                        style={{
                          marginTop: '8px',
                          boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px;',
                          borderRadius: '10px',
                          padding: '10px',
                        }}
                      >
                        {member.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        {/* To toggle to site updates and purchase req and site documents */}
        <div
          style={content}
          className={
            toggleUpdateState === 2 ? 'content active-content' : 'content'
          }
        >
          <SiteUpdates id={id} />
        </div>

        <div
          className={
            toggleUpdateState === 3 ? 'content active-content' : 'content'
          }
        >
          <PurchaseReq id={id} />
        </div>

        <div
          className={
            toggleUpdateState === 4 ? 'content active-content' : 'content'
          }
        >
          <SiteDocuments id={id} />
        </div>
      </div>
      <ProjectModal
        open={projectModalOpen}
        setOpen={setProjectModalOpen}
        data={project}
      />
    </div>
  );
}
