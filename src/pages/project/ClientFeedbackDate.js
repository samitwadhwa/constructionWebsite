import React, { useState } from 'react';
import dayjs from 'dayjs';
import LocalisedFormat from 'dayjs/plugin/localizedFormat';
import '../styles/style.css';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import WestIcon from '@mui/icons-material/West';
import AllFeedbackGrid from './components/AllFeedbackGrid';
import Grid from '@mui/material/Grid';
import axios from 'axios';
dayjs.extend(LocalisedFormat);

export default function ClientFeedbackDate({
  sendChildParentFeedback,
  singleFeedback,
}) {
  const { id } = useParams();
  const feedbackId = singleFeedback.feedbackListItem._id;
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const date = new Date(dayjs(singleFeedback.feedbackListItem.createdAt).$d);

  const [updateData, setUpdateData] = useState([]);
  const token = localStorage.getItem('token');
  const [feedbackList, setFeedbackList] = useState({});
  const navigate = useNavigate();
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

  const handleUpdate = () => {
    setIsLoading(true);
    const data = {
      categories: updateData,
    };
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/client/feedback/${feedbackId}/add-category`,
        data,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        setIsLoading(false);
        setUpdateData([]);
        showAlerts('Feedback updated successfully!', 'success');
        window.location.reload(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
        showAlerts('Error updating feedback!', 'error');
      });
  };

  return (
    <div
      style={{
        margin: '2rem 1rem 1rem 3rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1.5rem',
      }}
    >
      <div style={{ paddingInline: '1rem' }}>
        <button
          style={{ backgroundColor: '#fff', marginBottom: '1.5rem' }}
          onClick={() => sendChildParentFeedback(true)}
        >
          <WestIcon /> Back
        </button>
        <div>
          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              margin: '1rem 0 0.2rem 0',
            }}
          >
            {`${date.toDateString().split(' ')[2]} ${
              date.toDateString().split(' ')[1]
            }, ${date.toDateString().split(' ')[3]}`}
          </p>

          <p>{getFeedbackTime(date)}</p>
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            paddingInline: '1rem',
            marginTop: '2rem',
          }}
        >
          All feedbacks
        </p>
        <div>
          <Grid
            container
            spacing={6}
            style={{ textAlign: 'justify' }}
            sx={{ paddingInline: '1rem' }}
          >
            <Grid item xs={5} md={5} lg={5}>
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#535353',
                }}
              >
                Description
              </p>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#535353',
                }}
              >
                Category
              </p>
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#535353',
                }}
              >
                Client Approval
              </p>
            </Grid>
          </Grid>
          <div
            style={{
              backgroundColor: '#EAEAEA',
              borderRadius: '0.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4rem',
              paddingInline: '1rem',
              paddingBlock: '3rem',
            }}
          >
            {singleFeedback['feedbackListItem'].messages.map((message, idx) => {
              return (
                <AllFeedbackGrid
                  key={message._id}
                  id={message._id}
                  description={message.message}
                  clientApproval={message.status}
                  categoryParent={message.category}
                  updateData={updateData}
                  setUpdateData={setUpdateData}
                />
              );
            })}
          </div>
        </div>
        <div
          style={{
            textAlign: 'right',
            marginTop: '1rem',
          }}
        >
          <Button
            variant='contained'
            sx={{ backgroundColor: '#768C15', borderRadius: '0.75rem' }}
            disabled={isLoading || updateData.length === 0}
            onClick={() => {
              handleUpdate();
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {singleFeedback['feedbackListItem'].remarks.length > 0 && (
        <div>
          <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Remarks</p>
          <div>
            {singleFeedback['feedbackListItem'].remarks.map((remark, idx) => {
              return <p key={idx + 1}>{`${idx + 1}.  ${remark.remark}`}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
