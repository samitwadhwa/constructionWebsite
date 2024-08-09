import React, { useState, useEffect } from 'react';

import '../styles/style.css';
import LoadingSpinner from '../components/LoadingSpinner';

import { useParams } from 'react-router-dom';
import Header from '../components/header';
import ProjectSideBar from './components/ProjectSideBar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeliverModal from './components/deliveryDate';
import ProcessModal from './components/markProcess.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CompleteModal from './components/markComplete';
import DownloadIcon from '@mui/icons-material/Download';

export default function PurchaseReq() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [showCompletedRequests, setShowCompletedRequests] = useState(false);
  const [dmOpen, setDmOpen] = useState(false);
  const [cmOpen, setCmOpen] = useState(false);
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const [purchaseReqs, setPurchaseReqs] = useState([]);
  const [date, setDate] = useState(new Date());
  const [pid, setPid] = useState('');
  const token = localStorage.getItem('token');
  const myCards = {
    width: '22rem',
  };

  useEffect(() => {
    const today = new Date();
    setDate(today);
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${id}/purchase-request`,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        console.log(res.data);

        setPurchaseReqs(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  const content = {
    background: 'rgba(118, 123, 106, 0.1)',
    width: '100%',
    height: '95vh',
  };

  const myBTN = {
    marginTop: '-3.7rem',
    borderRadius: '8rem',
    fontSize: '1.2rem',
    color: 'white',
    background: '#7B931B',
    border: '0px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '700',
    cursor: 'pointer',
    position: 'absolute',
    width: '80%',
  };

  const myBody = {
    boxShadow: '0px 4px 12px rgb(0 0 0 / 25%)',
    borderRadius: '10px',
  };

  const myContent2 = {
    // marginBottom: "-18rem",
    // marginTop: "2rem",
    paddingBottom: '-18rem',
    paddingTop: '2rem',
    paddingLeft: '2.43rem',
  };
  const myCards9 = {
    width: '22rem',
    top: '0rem',
    border: 'none',
    marginRight: '2rem',
  };
  const myCards1 = {
    width: '22rem',
  };

  const myTitle = {
    fontFamily: "'Montserrat', sans-serif",
  };
  const myText = {
    marginTop: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    position: 'relative',
    fontFamily: "'Montserrat', sans-serif",

    fontSize: '0.9rem',
  };

  const myBTN2 = {
    marginTop: '3rem',
    borderRadius: '1rem',

    fontSize: '1.2rem',
    color: 'white',
    background: '#7B931B',
    border: '0px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '700',
    cursor: 'pointer',
    position: 'relative',
    // top : "-15rem"
    width: '80%',
  };

  const myBody2 = {
    boxShadow: '0px 4px 12px rgb(0 0 0 / 25%)',
    borderRadius: '10px',
  };

  const myText3 = {
    marginTop: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    position: 'relative',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    color: '#8B8B8B',

    fontSize: '0.9rem',
  };
  const myBTN3 = {
    marginTop: '3rem',
    borderRadius: '1rem',

    fontSize: '1.2rem',
    color: 'white',
    background: '#7B931B',
    border: '0px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '700',
    cursor: 'pointer',
    position: 'relative',
    width: '80%',
  };

  const myBody3 = {
    boxShadow: '0px 4px 12px rgb(0 0 0 / 25%)',
    borderRadius: '10px',
  };

  return (
    <div>
      <div>
        {/* For displaying the sidebars */}
        <Header />
        <div style={{ display: 'flex' }}>
          {/* ProjectSidebar Component */}
          <ProjectSideBar id={id} toggleState={2} />
          <div
            className='Updates'
            style={{ width: '100%', background: 'rgba(118, 123, 106, 0.1)' }}
          >
            <div className='content-tabs'>
              {/* Making cards or modal for purchase req */}

              <div
                className={
                  toggleUpdateState === 1
                    ? 'content-pur  active-content'
                    : 'content'
                }
                style={myContent2}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h3
                      className='my-4'
                      style={{
                        fontFamily: "'Montserrat', sans- serif",
                        fontWeight: '700',
                      }}
                    >
                      Purchase Requests
                    </h3>
                  </div>

                  <div>
                    {showCompletedRequests ? (
                      <button
                        style={{
                          cursor: 'pointer',
                          marginTop: '-3.1rem',
                          color: 'white',
                          backgroundColor: 'rgb(123, 147, 27)',
                          padding: '0.5rem 0.6em',
                          borderRadius: '5px',
                          marginRight: '2rem',
                        }}
                        onClick={() => {
                          setShowCompletedRequests(false);
                        }}
                      >
                        Show all
                      </button>
                    ) : (
                      <button
                        style={{
                          cursor: 'pointer',
                          marginTop: '-3.1rem',
                          color: 'white',
                          backgroundColor: 'rgb(123, 147, 27)',
                          padding: '0.5rem 0.6em',
                          borderRadius: '5px',
                          marginRight: '1rem',
                        }}
                        onClick={() => {
                          setShowCompletedRequests(true);
                        }}
                      >
                        Completed Requests
                      </button>
                    )}
                  </div>
                </div>
                <div className='center'></div>
                <div className='row' style={{ marginRight: '0' }}>
                  {showCompletedRequests
                    ? purchaseReqs.map((purchaseRequest, index) => {
                        if (purchaseRequest.status.completed) {
                          return (
                            <>
                              <div className='col-md-4'>
                                <div className='card my-3' style={myCards9}>
                                  <div style={myBody2} className='card-body'>
                                    <p style={{ fontWeight: 'bold' }}>
                                      {purchaseRequest.uid}
                                    </p>
                                    <hr
                                      style={{
                                        width: 'auto',
                                        marginBottom: '10px',
                                      }}
                                    />
                                    {purchaseRequest.items.length > 0 &&
                                      purchaseRequest.itemsFileUrl == null && (
                                        <div
                                          style={{
                                            marginBottom: '0.3rem',
                                            fontFamily:
                                              "'Montserrat', sans-serif",
                                          }}
                                        >
                                          <p
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              marginBottom: '0.2rem',
                                            }}
                                          >
                                            <span>Material</span>
                                            <span>Quantity</span>
                                          </p>
                                          <div
                                            style={{
                                              height: '7rem',
                                              backgroundColor: '#ECECEC',
                                              borderRadius: '0.5rem',
                                              overflowY: 'auto',
                                              padding: '1rem',
                                            }}
                                          >
                                            {purchaseRequest.items.map(
                                              (prItem) => {
                                                return (
                                                  <div
                                                    style={{
                                                      display: 'flex',
                                                      justifyContent:
                                                        'space-between',
                                                      marginBotton: '3px',
                                                    }}
                                                  >
                                                    <span>
                                                      {prItem.material}
                                                    </span>
                                                    <span>
                                                      {prItem.quantity}
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    {purchaseRequest.itemsFileUrl != null && (
                                      <div
                                        style={{
                                          marginBottom: '0.3rem',
                                          fontFamily:
                                            "'Montserrat', sans-serif",
                                        }}
                                      >
                                        <p style={{ marginBottom: '0.2rem' }}>
                                          Document
                                        </p>
                                        <div
                                          style={{
                                            height: '7rem',
                                            backgroundColor: '#E5F0FF',
                                            borderRadius: '0.5rem',
                                            overflowY: 'auto',
                                            padding: '1rem',
                                            textAlign: 'center',
                                          }}
                                        >
                                          <p style={{ color: '#3A77D2' }}>
                                            download document
                                          </p>
                                          <DownloadIcon
                                            sx={{ color: '#3A77D2' }}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                              window.location.assign(
                                                purchaseRequest.itemsFileUrl
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    )}
                                    <p style={myText} className='card-text'>
                                      Request date:{' '}
                                      <b>
                                        {
                                          purchaseRequest.requestDate.split(
                                            'T'
                                          )[0]
                                        }
                                      </b>
                                    </p>
                                    <p style={myText} className='card-text'>
                                      Required date:{' '}
                                      <b>
                                        {
                                          purchaseRequest.requiredDate.split(
                                            'T'
                                          )[0]
                                        }
                                      </b>
                                    </p>
                                    <p style={myText} className='card-text'>
                                      Delivery date:{' '}
                                      <b>
                                        {String(
                                          purchaseRequest.deliveryDate
                                        ).slice(0, 10)}
                                      </b>
                                    </p>
                                  </div>
                                  <div className='card my-3' style={myCards}>
                                    <div style={myBody3} className='card-body'>
                                      <p style={myText3} className='card-text'>
                                        {' '}
                                        {purchaseRequest.status.delivered ? (
                                          <CheckCircleOutlineIcon
                                            sx={{ color: 'green' }}
                                          />
                                        ) : (
                                          <CheckCircleOutlineIcon />
                                        )}{' '}
                                        Delivery_confirmed{' '}
                                      </p>
                                      <p style={myText3} className='card-text'>
                                        {' '}
                                        {purchaseRequest.status.qualityCheck ? (
                                          <CheckCircleOutlineIcon
                                            sx={{ color: 'green' }}
                                          />
                                        ) : (
                                          <CheckCircleOutlineIcon />
                                        )}{' '}
                                        Quality_confirmed
                                      </p>
                                      <p style={myText3} className='card-text'>
                                        {purchaseRequest.status.fileUploaded ? (
                                          <>
                                            <CheckCircleOutlineIcon
                                              sx={{ color: 'green' }}
                                            />{' '}
                                            Invoice{' '}
                                            <DownloadIcon
                                              sx={{ color: 'blue' }}
                                              style={{ cursor: 'pointer' }}
                                              onClick={() =>
                                                window.location.assign(
                                                  purchaseRequest.fileUrl
                                                )
                                              }
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <CheckCircleOutlineIcon />
                                            Invoice
                                          </>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        }
                      })
                    : purchaseReqs.map((purchaseRequest, index) => {
                        if (!purchaseRequest.status.completed)
                          return (
                            <>
                              <div
                                className='col-md-4 col-sm-6'
                                style={{ maxWidth: 'unset' }}
                              >
                                <div>
                                  <div>
                                    <div className='card my-3' style={myCards1}>
                                      <div
                                        style={myBody2}
                                        className='card-body'
                                      >
                                        <p style={{ fontWeight: 'bold' }}>
                                          {purchaseRequest.uid}
                                        </p>
                                        <hr
                                          style={{
                                            width: 'auto',
                                            marginBottom: '10px',
                                          }}
                                        />
                                        {purchaseRequest.items.length > 0 &&
                                          purchaseRequest.itemsFileUrl ==
                                            null && (
                                            <div
                                              style={{
                                                marginBottom: '0.3rem',
                                                fontFamily:
                                                  "'Montserrat', sans-serif",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  display: 'flex',
                                                  justifyContent:
                                                    'space-between',
                                                  marginBottom: '0.2rem',
                                                }}
                                              >
                                                <span>Material</span>
                                                <span>Quantity</span>
                                              </p>
                                              <div
                                                style={{
                                                  height: '7rem',
                                                  backgroundColor: '#ECECEC',
                                                  borderRadius: '0.5rem',
                                                  overflowY: 'auto',
                                                  padding: '1rem',
                                                }}
                                              >
                                                {purchaseRequest.items.map(
                                                  (prItem) => {
                                                    return (
                                                      <div
                                                        style={{
                                                          display: 'flex',
                                                          justifyContent:
                                                            'space-between',
                                                          marginBotton: '3px',
                                                        }}
                                                      >
                                                        <span>
                                                          {prItem.material}
                                                        </span>
                                                        <span>
                                                          {prItem.quantity}
                                                        </span>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        {purchaseRequest.itemsFileUrl !=
                                          null && (
                                          <div
                                            style={{
                                              marginBottom: '0.3rem',
                                              fontFamily:
                                                "'Montserrat', sans-serif",
                                            }}
                                          >
                                            <p
                                              style={{ marginBottom: '0.2rem' }}
                                            >
                                              Document
                                            </p>
                                            <div
                                              style={{
                                                height: '7rem',
                                                backgroundColor: '#E5F0FF',
                                                borderRadius: '0.5rem',
                                                overflowY: 'auto',
                                                padding: '1rem',
                                                textAlign: 'center',
                                              }}
                                            >
                                              <p style={{ color: '#3A77D2' }}>
                                                download document
                                              </p>
                                              <DownloadIcon
                                                sx={{ color: '#3A77D2' }}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                  window.location.assign(
                                                    purchaseRequest.itemsFileUrl
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        )}
                                        <p style={myText} className='card-text'>
                                          Request date:{' '}
                                          <b>
                                            {
                                              purchaseRequest.requestDate.split(
                                                'T'
                                              )[0]
                                            }
                                          </b>
                                        </p>
                                        <p style={myText} className='card-text'>
                                          Required date:{' '}
                                          <b>
                                            {
                                              purchaseRequest.requiredDate.split(
                                                'T'
                                              )[0]
                                            }
                                          </b>
                                        </p>
                                        <p style={myText} className='card-text'>
                                          Delivery date:{' '}
                                          <b>
                                            {String(
                                              purchaseRequest.deliveryDate
                                            ).slice(0, 10)}
                                          </b>
                                        </p>

                                        <div
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexGrow: 1,
                                          }}
                                        >
                                          {purchaseRequest.status.processed ===
                                          false ? (
                                            <button
                                              href='#'
                                              style={myBTN2}
                                              className='btn btn-sm btn-dark'
                                              onClick={() => {
                                                setPid(purchaseRequest._id);
                                                setProcessModalOpen(true);
                                              }}
                                            >
                                              Mark as processed
                                            </button>
                                          ) : (
                                            <button
                                              href='#'
                                              style={myBTN2}
                                              className='btn btn-sm btn-dark'
                                              disabled
                                            >
                                              Marked as processed
                                            </button>
                                          )}
                                        </div>
                                        {/* btn-sm for small size of buttons */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className='card my-3' style={myCards}>
                                    <div style={myBody} className='card-body'>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          flexGrow: 1,
                                          marginTop: '5rem',
                                        }}
                                      >
                                        {purchaseRequest.status.processed ? (
                                          purchaseRequest.status
                                            .deliveryDateCheck ? (
                                            <button
                                              href='#'
                                              style={myBTN}
                                              className='btn btn-sm btn-dark'
                                              disabled
                                            >
                                              Added delivery date
                                            </button>
                                          ) : (
                                            <button
                                              href='#'
                                              style={myBTN}
                                              className='btn btn-sm btn-dark'
                                              onClick={() => {
                                                setPid(purchaseRequest._id);
                                                setDmOpen(true);
                                              }}
                                            >
                                              Add Delivery Date{' '}
                                            </button>
                                          )
                                        ) : (
                                          <button
                                            href='#'
                                            style={myBTN}
                                            className='btn btn-sm btn-dark'
                                            disabled
                                          >
                                            Add Delivery Date{' '}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {isLoading ? <LoadingSpinner /> : null}
                                    <div className='card my-3' style={myCards}>
                                      <div
                                        style={myBody3}
                                        className='card-body'
                                      >
                                        <p
                                          style={myText3}
                                          className='card-text'
                                        >
                                          {' '}
                                          {purchaseRequest.status.delivered ? (
                                            <CheckCircleOutlineIcon
                                              sx={{ color: 'green' }}
                                            />
                                          ) : (
                                            <CheckCircleOutlineIcon />
                                          )}{' '}
                                          Delivery_confirmed{' '}
                                        </p>
                                        <p
                                          style={myText3}
                                          className='card-text'
                                        >
                                          {' '}
                                          {purchaseRequest.status
                                            .qualityCheck ? (
                                            <CheckCircleOutlineIcon
                                              sx={{ color: 'green' }}
                                            />
                                          ) : (
                                            <CheckCircleOutlineIcon />
                                          )}{' '}
                                          Quality_confirmed
                                        </p>
                                        <p
                                          style={myText3}
                                          className='card-text'
                                        >
                                          {purchaseRequest.status
                                            .fileUploaded ? (
                                            <>
                                              <CheckCircleOutlineIcon
                                                sx={{ color: 'green' }}
                                              />{' '}
                                              Invoice{' '}
                                              <DownloadIcon
                                                sx={{ color: 'blue' }}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                  window.location.assign(
                                                    purchaseRequest.fileUrl
                                                  )
                                                }
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <CheckCircleOutlineIcon />
                                              Invoice
                                            </>
                                          )}
                                        </p>

                                        <div
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexGrow: 1,
                                          }}
                                        >
                                          {purchaseRequest.status
                                            .fileUploaded ? (
                                            <button
                                              href='#'
                                              style={myBTN3}
                                              className='btn btn-sm btn-dark'
                                              onClick={() => {
                                                setPid(purchaseRequest._id);
                                                setCmOpen(true);
                                              }}
                                            >
                                              Mark as Completed
                                            </button>
                                          ) : (
                                            <button
                                              href='#'
                                              style={myBTN3}
                                              className='btn btn-sm btn-dark'
                                              disabled
                                            >
                                              Mark as Completed
                                            </button>
                                          )}{' '}
                                        </div>
                                        {/* btn-sm for small size of buttons */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                      })}
                </div>
              </div>

              <ProcessModal
                open={processModalOpen}
                setOpen={setProcessModalOpen}
                pid={pid}
                id={id}
              />
              <CompleteModal
                open={cmOpen}
                setOpen={setCmOpen}
                pid={pid}
                id={id}
              />
              <DeliverModal
                open={dmOpen}
                setOpen={setDmOpen}
                id={id}
                pid={pid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
