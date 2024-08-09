import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useEffect, useState } from 'react';
import './style.css';

export default function ProjectSideBar({ id, toggleState }) {
  const navigate = useNavigate();
  const [projLoading, setProjLoading] = useState(false);
  const [toggleUpdateState, setToggleUpdateState] = useState(
    toggleState ? toggleState : 1
  );
  const [project, setProject] = useState({});
  const token = localStorage.getItem('token');
  const backToDashBoardIcon = {
    marginTop: '0rem',
    borderRadius: '4rem',
    padding: ' 4px 1px',
    backgroundColor: ' #C4C4C4',
  };
  const purchaseReqButton = {
    fontSize: '1rem',
    textAlign: 'start',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    height: '2.5rem',
  };
  const siteUpdatesButton = {
    fontSize: '1rem',
    textAlign: 'start',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    height: '2.5rem',
    marginTop: '1.5rem',
  };
  const projectInfoButton = {
    fontSize: '1.25rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    height: '2.5rem',
  };
  const backToDashBoardButton = {
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };
  const projectSideBar = {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    flexDirection: 'column',
  };
  const activeTabs = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };
  const Project = () => {
    navigate('/Project');
  };
  useEffect(() => {
    setProjLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/projects/get-project/${id}`, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then((res) => {
        setProject(res.data.data);
        setProjLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div
      className='Updates'
      style={{
        height: '90vh',
        background: 'white',
        width: '20vw',
        paddingLeft: '1rem',
      }}
    >
      <div className='bloc-update-tabs'>
        <button
          style={backToDashBoardButton}
          className={toggleUpdateState === 1 ? 'tabs-update' : 'tabs-update'}
          onClick={() => Project()}
        >
          <ArrowBackIosOutlinedIcon style={backToDashBoardIcon} />{' '}
          <span>Back to Dashboard</span>
        </button>
        <Link to={`/projects/${id}`}>
          <button
            style={projectInfoButton}
            className={toggleUpdateState === -1 ? 'tabs-update' : 'tabs-update'}
          >
            {projLoading ? (
              <LoadingSpinner h='unset' />
            ) : (
              <div style={projectSideBar}>
                <div
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: '10rem',
                    textAlign: 'start',
                  }}
                >
                  {project.site_name}
                </div>

                <div
                  style={{
                    width: '10rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <DashboardIcon />
                  <div
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {project.location}
                  </div>
                </div>
              </div>
            )}
          </button>
        </Link>
        <Link to={`/projects/${id}/site-updates`}>
          <button
            style={siteUpdatesButton}
            className={
              toggleUpdateState === 1 ? 'tabs-update activeTabs' : 'tabs-update'
            }
          >
            Site Updates
          </button>
        </Link>
        <Link to={`/projects/${id}/purchase-req`}>
          <button
            style={purchaseReqButton}
            className={
              toggleUpdateState === 2 ? 'tabs-update activeTabs' : 'tabs-update'
            }
          >
            Purchase Requests
          </button>
        </Link>
        <Link to={`/projects/${id}/site-documents`}>
          <button
            style={purchaseReqButton}
            className={
              toggleUpdateState === 3 ? 'tabs-update activeTabs' : 'tabs-update'
            }
          >
            Site Documents
          </button>
        </Link>
        <Link to={`/projects/${id}/reimbursement-req`}>
          <button
            style={purchaseReqButton}
            className={
              toggleUpdateState === 4 ? 'tabs-update activeTabs' : 'tabs-update'
            }
          >
            Reimbursements
          </button>
        </Link>
        <Link to={`/projects/${id}/change-req`}>
          <button
            style={purchaseReqButton}
            className={
              toggleUpdateState === 5 ? 'tabs-update activeTabs' : 'tabs-update'
            }
          >
            Change Requests
          </button>
        </Link>
        <Link to={`/projects/${id}/client-feedback`}>
          <button
            style={purchaseReqButton}
            className={
              toggleUpdateState === 6 ? 'tabs-update activeTabs' : 'tabs-update'
            }
          >
            Client Feedback
          </button>
        </Link>
        <Link to={`/projects/${id}/quality-checklist`}>
          <button
            style={purchaseReqButton}
            className={
              toggleUpdateState === 7 ? 'tabs-update activeTabs' : 'tabs-update'
            }
          >
            Quality Checklist
          </button>
        </Link>
      </div>
    </div>
  );
}
