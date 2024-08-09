import { Download, West } from '@mui/icons-material';
import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Badge from '../components/Badge';
import LoadingSpinner from '../components/LoadingSpinner';
import Popup from '../components/Popup';
import styles from './styles/QualityChecklist.module.css';

function SingleChecklist({
  id,
  setMoreDetailsPage,
  categories,
  setCategories,
}) {
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(true);
  const [checklist, setChecklist] = useState([]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});

  const handleApprove = () => {
    const data = {
      title: 'Accept Checklist',
      text: 'Are you sure?',
      handleConfirm: () => {
        setIsLoading(true);
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/items/${id}`,
            { status: 'approved' },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            setChecklist(res.data.data);
            setCategories(
              categories.map((category) => {
                if (category._id === res.data.data._id) {
                  return res.data.data;
                }
                return category;
              })
            );
            console.log(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err.response);
            setIsLoading(false);
          });
      },
    };
    setPopupData(data);
    setPopupOpen(true);
  };
  const handleReject = () => {
    const data = {
      title: 'Reject Checklist',
      text: 'Please add a reason for rejecting this quality checklist.',
      textArea: 'Enter Reason',
      errorMsg: 'Enter a reason to Reject!',
      handleConfirm: (value) => {
        setIsLoading(true);
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/items/${id}`,
            { status: 'rejected', rejection_reason: value },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            setChecklist(res.data.data);
            setCategories(
              categories.map((category) => {
                if (category._id === res.data.data._id) {
                  return res.data.data;
                }
                return category;
              })
            );
            console.log(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err.response);
            setIsLoading(false);
          });
      },
    };
    setPopupData(data);
    setPopupOpen(true);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/items/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then((res) => {
        setChecklist(res.data.data);
        setIsLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  if (isLoading) {
    return (
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
    );
  }

  const createdDate = String(checklist.createdAt);

  return (
    <div className={styles.container}>
      <Popup
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        data={popupData}
      />
      <button className={styles.flex} onClick={() => setMoreDetailsPage(false)}>
        <West />
        <span style={{ marginLeft: '0.25rem' }}>Back</span>
      </button>
      <main className={styles.content} style={{ marginTop: '2rem' }}>
        <div>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <h5 style={{ fontWeight: 'bold', fontSize: '1.5rem', margin: '0' }}>
              {checklist.title}
            </h5>
            <span>
              <Badge
                text={checklist.status || 'pending'}
                color={
                  checklist.status === 'rejected'
                    ? '#F5675Eee'
                    : checklist.status === 'approved'
                    ? '#768C15dd'
                    : '#030F2754'
                }
              />
            </span>
          </div>
          <p style={{ margin: '0', color: '#6C6A6A' }}>
            {createdDate &&
              createdDate.slice(0, 10).split('-').reverse().join('/')}
          </p>
        </div>
        <div style={{ marginBlock: '2rem', fontWeight: 'bold' }}>
          <p style={{ margin: '0', fontSize: '1.20rem' }}>
            {checklist.categoryName}
          </p>
        </div>

        <div className={styles.stack}>
          <Grid sx={{ fontWeight: 'bold' }} container columnSpacing={4}>
            <Grid item xs={1}>
              Sl. No.
            </Grid>
            <Grid item xs={5}>
              Item
            </Grid>
            <Grid item xs={2}>
              Status
            </Grid>
            <Grid item xs={3}>
              Remarks
            </Grid>
            <Grid item xs={1} sx={{ textAlign: 'center' }}>
              Proof
            </Grid>
          </Grid>
          {checklist.items.map((item, index) => (
            <div key={item._id}>
              <Grid container columnSpacing={4}>
                <Grid item xs={1}>
                  {index + 1}
                </Grid>
                <Grid item xs={5}>
                  {item.title}
                </Grid>
                <Grid item xs={2}>
                  {item.is_completed}
                </Grid>
                <Grid item xs={3}>
                  {item.remarks}
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                  {item.image_url !== '' && (
                    <a target='_blank' href={item.image_url} download>
                      <Download
                        sx={{
                          color: '#3A77D2',
                          cursor: 'pointer',
                          zIndex: '20',
                        }}
                      />
                    </a>
                  )}
                  {/* {item.image_url ? '|' : '*'} */}
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
        {checklist.status !== 'approved' && checklist.status !== 'rejected' && (
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleApprove}>
              Approve
            </button>
            <button
              className={styles.button}
              style={{ backgroundColor: '#F5675E' }}
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default SingleChecklist;
