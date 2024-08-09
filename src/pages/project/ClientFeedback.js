import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import LocalisedFormat from 'dayjs/plugin/localizedFormat';
import '../styles/style.css';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import ProjectSideBar from './components/ProjectSideBar';
import EastIcon from '@mui/icons-material/East';
import axios from 'axios';
import ClientFeedbackDate from './ClientFeedbackDate';
import LoadingSpinner from '../components/LoadingSpinner';
dayjs.extend(LocalisedFormat);

export default function ClientFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const [showAllFeedback, setShowAllFeedback] = useState(true);
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const token = localStorage.getItem('token');
  const [feedbackList, setFeedbackList] = useState([]);
  const [singleFeedback, setSingleFeedback] = useState();
  const getFeedbackTime = (date) => {
    let hours = date.getHours();
    let AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    let minutes = date.getMinutes();
    return (
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes) +
      ' ' +
      AmOrPm
    );
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/client/feedback/${id}/get-feedback`,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        setFeedbackList(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <div>
        {/* For displaying the sidebars */}
        <Header />
        <div style={{ display: 'flex' }}>
          {/* ProjectSidebar Component */}
          <ProjectSideBar id={id} toggleState={6} />
          {/* Client Feedback Content */}

          {isLoading ? (
            <div
              style={{
                display: 'grid',
                height: '90vh',
                width: '100vw',
                placeItems: 'center',
              }}
            >
              <LoadingSpinner />
            </div>
          ) : (
            <div
              style={{
                backgroundColor: '#F1F2F0',
                width: '100%',
                flexGrow: 1,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {feedbackList.length === 0 ? (
                <div
                  style={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <h2>No Client Feedbacks Available!</h2>
                </div>
              ) : (
                <div>
                  {showAllFeedback && (
                    <h3 style={{ padding: '1rem 0 0 3rem' }}>
                      Client Feedback
                    </h3>
                  )}
                  {showAllFeedback && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem 1rem 0 3rem',
                      }}
                    >
                      {feedbackList.map((feedbackListItem, idx) => {
                        console.log(feedbackListItem);
                        const date = new Date(feedbackListItem.createdAt);
                        console.log(date);
                        return (
                          <div
                            key={feedbackListItem._id}
                            style={{
                              backgroundColor: '#FFF',
                              width: '100%',
                              flexGrow: 1,
                              borderRadius: '10px',
                              paddingBlock: '1.25rem',
                              paddingInline: '2.5rem',
                              maxHeight: '13rem',
                              marginBottom: '1rem',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div style={{ width: '75%' }}>
                                <p
                                  style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    marginBottom: '0.2rem',
                                  }}
                                >
                                  {`${date.toDateString().split(' ')[2]} ${
                                    date.toDateString().split(' ')[1]
                                  }, ${date.toDateString().split(' ')[3]}`}
                                </p>
                                <p>{getFeedbackTime(date)}</p>
                                <p style={{ marginBottom: 0 }}>
                                  {feedbackListItem.messages[0].message}
                                </p>
                              </div>
                              {
                                <button
                                  style={{
                                    color: '#5E99F2',
                                    width: '20%',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    textAlign: 'right',
                                  }}
                                  onClick={() => {
                                    setShowAllFeedback(false);
                                    setSingleFeedback({ feedbackListItem });
                                  }}
                                >
                                  {feedbackListItem.messages.length - 1 === 0
                                    ? `View More`
                                    : `${
                                        feedbackListItem.messages.length - 1
                                      } more feedback${
                                        feedbackListItem.messages.length - 1 > 1
                                          ? 's'
                                          : ''
                                      }`}{' '}
                                  <EastIcon />
                                </button>
                              }
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              {!showAllFeedback && (
                <ClientFeedbackDate
                  sendChildParentFeedback={setShowAllFeedback}
                  singleFeedback={singleFeedback}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
