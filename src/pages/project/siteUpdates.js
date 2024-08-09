import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useDemoData } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DatePicker from 'react-multi-date-picker';
import '../styles/style.css';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv';
import SiteDocuments from './SiteDocuments';
import ProjectSideBar from './components/ProjectSideBar';

function siteUpdates() {
  const navigate = useNavigate();
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const { id } = useParams();
  const getYesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let yesterday = d.toISOString().split('T')[0];
    console.log(yesterday);
    return yesterday;
  };

  const getDateString = (date) => {
    console.log(date);
    let from = date.split('-');
    let f = new Date(from[0], from[1] - 1, from[2]);
    let to = f.toString().split('00:00:00')[0];
    return to;
  };
  const Footer = () => {
    return <div></div>;
  };
  const HistoryTab = {
    cursor: 'pointer',
    fontSize: '1.2rem',
    /* margin-left: -1rem; */
    fontFamily: "'Montserrat', sans-serif",
    position: 'relative',
    left: '-2rem',
    marginTop: '1rem',
  };
  const token = localStorage.getItem('token');
  const [isTodaysUpdate, setIsTodaysUpdate] = useState(true);
  const [date, setDate] = useState(new Date());
  const [row, setRow] = useState([]);
  const [siteUpdates, setSiteUpdates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const today_date = today.toISOString().split('T')[0];
    console.log(today);
    setDate(today_date);
  }, []);
  const content = {
    background: 'rgba(118, 123, 106, 0.1)',
    width: '100%',
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${id}/get-site-update?date=${date}`,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        const rowData = [];
        res.data.data.map((item) => {
          rowData.push({
            id: item._id,
            time: item.type,
            supervisor: item.supervisor,
            vendor: item.vendor,
            work: item.work,
            employee: item.labour_count,
          });
        });
        setRow(rowData);
        console.log(row);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  const columns = [
    {
      field: 'time',
      headerName: 'Time',
      width: 240,
      renderCell: (props) => {
        if (props.row.time === 'Evening') {
          return (
            <div
              style={{
                color: 'white',
                backgroundColor: '#825FE4',
                padding: '0.3rem 1.4rem',
                borderRadius: '3rem',
              }}
            >
              {props.row.time}
            </div>
          );
        }
        return (
          <div
            style={{
              color: 'white',
              backgroundColor: '#3BA7BE',
              padding: '0.3rem 1.4rem',
              borderRadius: '3rem',
            }}
          >
            {props.row.time}
          </div>
        );
      },
    },
    { field: 'supervisor', headerName: 'Supervisor', width: 233 },
    { field: 'vendor', headerName: 'Vendor Name', width: 233 },
    { field: 'work', headerName: 'Work', width: 233 },
    { field: 'employee', headerName: 'labourers', width: 233 },
  ];

  const getDate = (date) => {
    const monthSelected = date.month < 10 ? '0' + date.month : date.month;
    const daySelected = date.day < 10 ? '0' + date.day : date.day;
    const selectedDate = date.year + '-' + monthSelected + '-' + daySelected;
    setDate(selectedDate);
  };

  return (
    <div style={content}>
      <Header />
      <div style={{ display: 'flex', width: '98vw' }}>
        {/* ProjectSidebar Component */}
        <ProjectSideBar id={id} toggleState={1} />
        {/* Making the table for site Updates using MUI */}
        <div style={{ marginTop: '-15px', width: '100%' }}>
          <div
            style={{
              flexGrow: 1,
              marginTop: '1rem',
              justifyContent: 'space-between',
              display: 'flex',
              marginLeft: 30,
              marginRight: 20,
              maxHeight: '4rem',
            }}
          >
            <h2>
              <strong
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1.2rem',
                }}
              >
                Site Updates
              </strong>
            </h2>
            {isTodaysUpdate ? (
              <h4
                style={HistoryTab}
                onClick={() => {
                  setDate(getYesterday());
                  setIsTodaysUpdate(false);
                }}
              >
                Show History
              </h4>
            ) : (
              <div style={{ display: 'block' }}>
                <h6
                  onClick={() => {
                    setIsTodaysUpdate(true);
                  }}
                >
                  Filter by Date
                </h6>
                <DatePicker
                  value={date}
                  defaultValue={date}
                  onChange={(_date) => getDate(_date)}
                />
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1,
              marginTop: '-2rem',
            }}
          >
            <h2 style={{ color: '#4A8BED' }}>
              {isTodaysUpdate ? "Today's updates" : getDateString(date)}
            </h2>
          </div>
          <div style={{ marginLeft: '20px', marginRight: '12px', flexGrow: 1 }}>
            <Box sx={{ width: 1 }} style={{ background: 'white' }}>
              <Box sx={{ height: '80vh', width: 1, mb: 2 }}>
                <DataGrid
                  columns={columns}
                  rows={row}
                  components={{
                    Footer: Footer,
                  }}
                />
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default siteUpdates;
