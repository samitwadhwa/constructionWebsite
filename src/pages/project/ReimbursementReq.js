import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import '../styles/style.css';
import dayjs from 'dayjs';
import LocalisedFormat from 'dayjs/plugin/localizedFormat';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import ProjectSideBar from './components/ProjectSideBar';
import { useNavigate, Link } from 'react-router-dom';
import reimb_styles from './styles/Reimb.module.css';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import Modal from '@mui/material/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReimbursementModel from './components/markPaidReim';
// import ReimbursementModel from "./markPaidReim";
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
dayjs.extend(LocalisedFormat);

export default function ReimbursementReq() {
  const [openDate, setOpenDate] = useState(false);
  const handleOpen = () => setOpenDate(true);
  const handleClose = () => setOpenDate(false);
  const [pickDate, setPickDate] = useState(new Date());
  const handleDateChange = (date) => {
    setPickDate(date);
    setOpenDate(false);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [showCompletedRequests, setShowCompletedRequests] = useState(false);
  const [reimLoading, setReimLoading] = useState(false);
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const token = localStorage.getItem('token');
  const [reimbursementReqs, setReimbursementReqs] = useState([]);
  const [completedReqs, setCompletedReqs] = useState([]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [requestId, setrequestId] = useState('');
  //get reimbursement requests fetch
  useEffect(() => {
    setReimLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/projects/reimbursement-request/${id}/view-requests`,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        setReimbursementReqs(res.data.data);
        setReimLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reimbursementReqs]);

  //show completed requests fetch
  useEffect(() => {
    setReimLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/projects/reimbursement-request/${id}/completed-requests`,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        setCompletedReqs(res.data.data);
        setReimLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showCompletedRequests]);

  //truncating long strings
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };
  const myContent2 = {
    marginLeft: '1rem',
    marginTop: '2rem',
    height: '45.7rem',
    width: '100%',
    backgroundColor: '#F1F2F0',
  };
  const myCards9 = {
    width: '22rem',
    top: '0rem',
    borderRadius: '10px',
  };
  const myTitle = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '500',
  };
  const myText = {
    position: 'relative',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '500',
    fontSize: '0.9rem',
    marginTop: '1rem',
  };
  const myBody2 = {
    boxShadow: '0px 4px 12px rgb(0 0 0 / 25%)',
    borderRadius: '10px',
    height: '20rem',
    display: 'flex',
    flexDirection: 'column',
  };
  const myBody3 = {
    boxShadow: '0px 4px 12px rgb(0 0 0 / 25%)',
    borderRadius: '10px',
    minHeight: '18.56rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  };
  const markButton = {
    borderRadius: '10px',
    backgroundColor: '#7B931B',
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: '0.5rem 1.5rem',
    cursor: 'pointer',
    float: 'right',
    marginTop: '0.5rem',
  };
  const pickDateStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '5px',
    boxShadow: 24,
    padding: '1rem',
    backgroundColor: 'white',
  };
  const fileUrlStyle = {
    float: 'right',
    padding: '5px 15px 5px 15px',
    border: '1px solid #7B931B',
    color: '#7B931B',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  };
  const noFileUrlStyle = {
    float: 'right',
    padding: '5px 5px',
    backgroundColor: '#D8D8D8',
    color: '#959595',
    borderRadius: '5px',
    textDecoration: 'none',
    width: '150px',
    textAlign: 'center',
  };
  return (
    <div>
      <style>
        {`.date-picker input {
            width: 100%
            }`}
      </style>
      <div>
        {/* For displaying the sidebars */}
        <Header />

        <div style={{ display: 'flex' }}>
          {/* ProjectSidebar Component */}
          <ProjectSideBar id={id} toggleState={4} />
          <div
            className='Updates'
            style={{ background: '#F1F2F0', width: '100%' }}
          >
            <div
              className={
                toggleUpdateState === 1 ? 'content  active-content' : 'content'
              }
              style={myContent2}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  display: 'contents',
                }}
              >
                {showCompletedRequests ? (
                  <h3
                    className='my-4'
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    Completed Requests
                  </h3>
                ) : (
                  <h3
                    className='my-4'
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    Reimbursement Requests
                  </h3>
                )}

                <div>
                  {showCompletedRequests ? (
                    <h6
                      style={{
                        ...markButton,
                        cursor: 'pointer',
                        marginTop: '-3.1rem',
                        marginRight: '20px',
                        float: 'right',
                      }}
                      onClick={handleOpen}
                    >
                      Filter by date
                    </h6>
                  ) : (
                    <h6
                      className={reimb_styles.bstyle}
                      style={{
                        ...markButton,
                        cursor: 'pointer',
                        marginTop: '-3.1rem',
                        marginRight: '20px',
                        float: 'right',
                      }}
                      onClick={() => {
                        setShowCompletedRequests(true);
                      }}
                    >
                      Completed Requests
                    </h6>
                  )}
                </div>
              </div>
              <div>
                {showCompletedRequests ? (
                  <h6
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#4A8BED',
                      fontSize: '1.5rem',
                    }}
                  >
                    {dayjs(pickDate).format('D MMM YYYY').toString()}
                  </h6>
                ) : (
                  <></>
                )}
              </div>

              <Grid container>
                {showCompletedRequests
                  ? completedReqs
                      .filter((reqst, idx) => {
                        return (
                          dayjs(reqst.updatedAt)
                            .format('D MMM YYYY')
                            .toString() ==
                          dayjs(pickDate).format('D MMM YYYY').toString()
                        );
                      })
                      .map((rbReq, index) => {
                        if (rbReq.isPaid && rbReq.isReceived) {
                          return (
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                              <div className='card my-3' style={myCards9}>
                                <div style={myBody3} className='card-body'>
                                  <div style={myTitle} className='card-text'>
                                    <b>Amount :</b>
                                    <br />
                                    {rbReq.amount}
                                  </div>
                                  <div
                                    style={myText}
                                    className={reimb_styles.multiLineEllipsis}
                                  >
                                    <b>Reason :</b>
                                    <br />
                                    {rbReq.reason}
                                  </div>
                                  {rbReq.fileUrl == null && (
                                    <div style={myText} className='card-text'>
                                      <b>Uploaded File : </b>
                                      <a style={noFileUrlStyle}>
                                        No File <DownloadIcon />{' '}
                                      </a>
                                    </div>
                                  )}
                                  {rbReq.fileUrl != null && (
                                    <div style={myText} className='card-text'>
                                      <b>Uploaded File : </b>
                                      <a
                                        href={rbReq.fileUrl}
                                        download
                                        target='_self'
                                        style={fileUrlStyle}
                                      >
                                        {truncate(
                                          rbReq.fileUrl.substring(
                                            rbReq.fileUrl.lastIndexOf('/') + 1
                                          ),
                                          15
                                        )}{' '}
                                        <DownloadIcon />{' '}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Grid>
                          );
                        }
                      })
                  : reimbursementReqs.map((rbReq, index) => {
                      return (
                        <>
                          <Grid
                            item
                            lg={4}
                            md={6}
                            sm={6}
                            xs={12}
                            key={rbReq.id}
                          >
                            <div className='card my-3' style={myCards9}>
                              <div style={myBody2} className='card-body'>
                                <div style={myTitle} className='card-text'>
                                  <b>Amount :</b>
                                  <br />
                                  {rbReq.amount}
                                </div>
                                <div
                                  style={myText}
                                  className={reimb_styles.multiLineEllipsis}
                                >
                                  <b>Reason :</b>
                                  <br />
                                  {rbReq.reason}
                                </div>
                                {rbReq.fileUrl === null && (
                                  <div style={myText} className='card-text'>
                                    <b>Uploaded File : </b>
                                    <a style={noFileUrlStyle}>
                                      No File <DownloadIcon />{' '}
                                    </a>
                                  </div>
                                )}
                                {rbReq.fileUrl !== null && (
                                  <div style={myText} className='card-text'>
                                    <b>Uploaded File : </b>
                                    <a
                                      href={rbReq.fileUrl}
                                      download
                                      target='_self'
                                      style={fileUrlStyle}
                                    >
                                      {truncate(
                                        rbReq.fileUrl.substring(
                                          rbReq.fileUrl.lastIndexOf('/') + 1
                                        ),
                                        15
                                      )}{' '}
                                      <DownloadIcon />{' '}
                                    </a>
                                  </div>
                                )}
                                {!rbReq.isPaid && (
                                  <div
                                    style={{
                                      justifySelf: 'flex-end',
                                      marginTop: '1rem',
                                    }}
                                  >
                                    <hr
                                      style={{
                                        marginBottom: '0.3rem',
                                        marginTop: '0.3rem',
                                        width: '100%',
                                      }}
                                    />
                                    <button
                                      style={markButton}
                                      onClick={() => {
                                        setrequestId(rbReq._id);
                                        setPaymentOpen(true);
                                      }}
                                    >
                                      Mark as paid
                                    </button>
                                  </div>
                                )}
                                {rbReq.isPaid && (
                                  <div
                                    style={{
                                      justifySelf: 'flex-end',
                                      padding: '1rem 0',
                                    }}
                                  >
                                    <hr
                                      style={{
                                        marginBottom: '0.3rem',
                                        marginTop: '0.3rem',
                                        width: '100%',
                                      }}
                                    />
                                    <p style={myText} className='card-text'>
                                      {' '}
                                      <b style={{ marginLeft: '2%' }}>
                                        Paid{' '}
                                        <DoneIcon
                                          style={{ color: '#7B931B' }}
                                        />
                                      </b>
                                      <span style={{ float: 'right' }}>
                                        confirmation pending
                                      </span>
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Grid>
                        </>
                      );
                    })}
                <Modal
                  open={openDate}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <div style={pickDateStyle}>
                    <DatePicker
                      selected={pickDate}
                      dateFormat='dd/MM/yyyy'
                      onChange={handleDateChange}
                      wrapperClassName='date-picker'
                    />
                  </div>
                </Modal>
                <ReimbursementModel
                  open={paymentOpen}
                  setOpen={setPaymentOpen}
                  reqId={requestId}
                />
              </Grid>
              {showCompletedRequests && (
                <button
                  style={{
                    cursor: 'pointer',
                    width: 'max-content',
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => setShowCompletedRequests(false)}
                >
                  <ArrowBackIcon /> Go back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
