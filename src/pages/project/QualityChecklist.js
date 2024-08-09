import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import ProjectSideBar from './components/ProjectSideBar';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Grid } from '@mui/material';
import styles from './styles/QualityChecklist.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import SingleChecklist from './SingleChecklist';
import Badge from '../components/Badge';

export default function ClientFeedback() {
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(true);
  const [moreDetailsPage, setMoreDetailsPage] = useState(false);
  const [singleCategoryId, setSingleCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const viewMoreDetails = (id) => {
    setSingleCategoryId(id);
    setMoreDetailsPage(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/items/completed?projectId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(res.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.component}>
      {/* For displaying the sidebars */}
      <Header />
      <div style={{ display: 'flex' }}>
        {/* ProjectSidebar Component */}
        <ProjectSideBar id={id} toggleState={7} />
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
        ) : moreDetailsPage ? (
          <SingleChecklist
            id={singleCategoryId}
            setMoreDetailsPage={setMoreDetailsPage}
            categories={categories}
            setCategories={setCategories}
          />
        ) : categories.length === 0 ? (
          <div
            className={styles.container}
            style={{ display: 'grid', placeItems: 'center' }}
          >
            <h2>No Quality Checklists Available!</h2>
          </div>
        ) : (
          <div className={styles.container}>
            <Grid container spacing={4}>
              {categories.map((category) => (
                /* TODO: Form Seperate Card Component */
                <Grid item xs={12} sm={6} lg={4} key={category._id}>
                  <div className={styles.card}>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <h5 style={{ fontWeight: 'bold', margin: '0' }}>
                          {category.categoryName}
                        </h5>
                        <Badge
                          text={category.status}
                          color={
                            category.status === 'rejected'
                              ? '#F5675Eee'
                              : category.status === 'approved'
                              ? '#768C15dd'
                              : '#030F2754'
                          }
                        />
                      </div>
                      <p style={{ margin: '0' }}>
                        {category.createdAt
                          .slice(0, 10)
                          .split('-')
                          .reverse()
                          .join('/')}
                      </p>
                    </div>
                    <div className={styles.flex}>
                      <p style={{ margin: '0', maxWidth: '70%' }}>
                        {category.title}
                      </p>
                      <p style={{ margin: '0 0 0 0' }}>
                        {category.items.length} items
                      </p>
                    </div>
                    <button
                      onClick={() => viewMoreDetails(category._id)}
                      className={styles.link}
                    >
                      <span
                        className={styles.flex}
                        style={{
                          justifyContent: 'flex-start',
                          gap: '0.5rem',
                        }}
                      >
                        <p style={{ margin: 0 }}>View More Details</p>
                        <ArrowRightAlt />
                      </span>
                    </button>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
