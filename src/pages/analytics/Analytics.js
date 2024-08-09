import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import analy_styles from './styles/Analytics.module.css';
import DatePicker from 'react-multi-date-picker';
import '../styles/style.css';
import InputLabel from '@mui/material/InputLabel';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainSideBar from '../components/MainSideBar';
import Header from '../components/header';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Divider, FormControl, Stack } from '@mui/material';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
export default function Analytics() {
  const navigate = useNavigate();
  const [projLoading, setProjLoading] = useState(false);
  const [toggleUpdateState, setToggleUpdateState] = useState(6);
  const [typeFilter, setTypeFilter] = useState('All');
  const Dashboard = () => {
    window.location.reload(false);
  };
  const Project = () => {
    navigate('/Project');
  };
  const { id } = useParams();
  const [project, setProject] = useState({});
  const token = localStorage.getItem('token');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [row, setRow] = useState([]);
  const [tab, setTab] = useState('1');

  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);
  const [totalLabor, setTotalLabor] = useState(0);
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
  const getDate = (date) => {
    const selectedDate =
      date.year +
      '-' +
      ('0' + date.month).slice(-2) +
      '-' +
      ('0' + date.day).slice(-2);
    setDate(selectedDate);
    console.log(selectedDate);
  };

  // * can optimise so that data will only be updated if not the same week
  // function notSameWeek(date) {
  //     return dayjs(new Date().toISOString().split('T')[0]).isoWeek() !== dayjs(date).isoWeek();
  // }

  const Footer = () => {
    return <div></div>;
  };

  useEffect(() => {
    const today = new Date();
    const today_date = today.toISOString().split('T')[0];
    console.log(today);
    setDate(today_date);
  }, []);

  function NoRowsOverlay() {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'></Stack>
    );
  }
  useEffect(() => {
    var apiURL = `${process.env.REACT_APP_BASE_URL}/api/over-view/for-site-update?date=${date}`;
    if (typeFilter !== 'All') {
      apiURL += `&type=${typeFilter}`;
    }
    console.log(apiURL);
    axios
      .get(apiURL, { headers: { authorization: `Bearer: ${token}` } })
      .then((res) => {
        const rowData = [];
        res.data.data.siteUpdateList.map((item, index) => {
          rowData.push({
            id: index,
            time: item.type,
            supervisor: item.supervisor,
            work: item.work,
            site: item.site,
            labourers: item.labourers,
          });
        });
        setTotalLabor(res.data.data.totalLabourers);
        setRow(rowData);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('getting avg data');

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/over-view/for-site-update-avg?date=${date}`,
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        const rowData2 = [];
        res.data.data.avgBySupervisor.map((item, index) => {
          rowData2.push({
            id: index,
            supervisor: item.name,
            avgLaborCount: item.avg,
          });
        });
        setRow2(rowData2);
        const rowData3 = [];
        res.data.data.avgBySiteName.map((item, index) => {
          rowData3.push({
            id: index,
            sites: item.name,
            avgLaborCount: item.avg,
          });
        });
        setRow3(rowData3);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date, typeFilter]);

  const columns = [
    {
      field: 'time',
      headerName: 'Time',
      width: 170,
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
    { field: 'site', headerName: 'Site', width: 170 },
    { field: 'supervisor', headerName: 'Supervisor', width: 170 },
    { field: 'work', headerName: 'Work', width: 170 },
    { field: 'labourers', headerName: 'Labourers', width: 170 },
  ];
  const columns2 = [
    { field: 'supervisor', headerName: 'Supervisor', width: 130 },
    { field: 'avgLaborCount', headerName: 'Avg. labour count', width: 130 },
  ];
  const columns3 = [
    { field: 'sites', headerName: 'Sites', width: 130 },
    { field: 'avgLaborCount', headerName: 'Avg. labour count', width: 130 },
  ];
  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };
  const siteUp = {
    fontSize: '1rem',
    marginLeft: '-1.7rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    height: '2.5rem',
    marginTop: '1.5rem',
  };

  const myTechIcon1 = {
    marginLeft: '-2rem',
    marginTop: '0rem',
    position: 'absolute',
    borderRadius: '4rem',
    padding: ' 4px 1px',
    backgroundColor: ' #C4C4C4',
  };
  const myTechIcon = {
    marginRight: '1rem',
  };
  const projectSideBar = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  };
  const mySetting = {
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',

    // width: "12.5rem"
  };
  const mySettingIcon = {
    marginLeft: '-2.1rem',
    position: 'absolute',
  };
  const myTask = {
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    marginLeft: '1.5rem',
  };
  const myAnalytics = {
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const myLogout = {
    fontSize: '1rem',
    marginBottom: '21rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const myVC = {
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
  };
  const myVC9 = {
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    marginLeft: '-1.5rem',
  };
  const myTeam = {
    fontSize: '1rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    marginLeft: '-0.5rem',
  };
  const myTeamIcon = {
    position: 'absolute',
    marginLeft: '-2.1rem',
  };
  const myLogIcon = {
    marginLeft: '-2rem',
    position: 'absolute',
  };
  const myTechIcon9 = {
    marginLeft: '-2.4rem',
    marginTop: '0rem',
    position: 'absolute',
  };
  const selectStyles = {
    minWidth: '180',
  };
  const TabHeading = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '1.2rem',
  };
  const handleTabs = (e) => {
    console.log(e.target.id);
    console.log(e.target);
    setTab(e.target.id);
  };
  // const active = {...analy_styles.tab,...analy_styles.activeTab}
  const tabHeadContainer = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    padding: '0 1rem',
  };
  const tabs = {
    flexGrow: 1,
    justifyContent: 'space-between',
    display: 'flex',
    margin: '1rem 1rem 0 1rem',
    maxHeight: '4rem',
  };
  return (
    <div>
      <Header />
      <div className='Updates'>
        <MainSideBar sideState={5} />
        <div style={{ width: '60rem' }}>
          <div style={tabHeadContainer}>
            <div style={tabs}>
              <h2
                className={`${analy_styles.tab} ${
                  tab === '1' ? analy_styles.activeTab : ''
                }`}
              >
                <strong id='1' style={TabHeading} onClick={handleTabs}>
                  Site Updates
                </strong>
              </h2>
            </div>
            {/* <Tabs TabIndicatorProps={{ style: { backgroundColor: "white" } }}>
                            <Tab label='Site Updates' />
                            <Tab label='Tab 2' />
                        </Tabs> */}
            <div></div>
            <Divider />
          </div>

          <div
            style={{
              margin: '0 1rem',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fff',
              padding: '0.2rem',
              borderRadius: '5px',
            }}
          >
            <div
              style={{
                alignSelf: 'flex-end',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '0.5rem',
                alignItems: 'center',
              }}
            >
              <div style={{ margin: '0 0.5rem' }}>
                <span style={{ marginRight: '3px', fontWeight: '600' }}>
                  Date :{' '}
                </span>
                <DatePicker
                  value={date}
                  defaultValue={date}
                  onChange={(_date) => {
                    console.log(_date);
                    getDate(_date);
                  }}
                />
              </div>
              <div style={{ margin: '0 0.5rem' }}>
                <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
                  <InputLabel>Type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    defaultValue={typeFilter}
                    label='Type'
                    autoWidth
                    onChange={handleTypeChange}
                    // styles={selectStyles}
                  >
                    <MenuItem value='All'> All </MenuItem>
                    <MenuItem value={'Evening'}>Evening</MenuItem>
                    <MenuItem value={'Morning'}>Morning</MenuItem>
                    <MenuItem value={'Weekend'}>Weekend</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <Box sx={{ width: 1 }} style={{ backgroundColor: 'white' }}>
              <Box sx={{ height: '70vh', width: 1, mb: 2 }}>
                <DataGrid
                  columns={columns}
                  rows={row}
                  components={{
                    Footer: Footer,
                    NoRowsOverlay: NoRowsOverlay,
                  }}
                  style={{ outline: 'none' }}
                />
              </Box>
            </Box>
            <div style={{ alignSelf: 'flex-end', margin: '0 1rem' }}>
              <h5>Total labourers : {totalLabor}</h5>
            </div>
          </div>
        </div>
        <div style={{ width: '20rem' }}>
          <div style={{ minHeight: '4rem' }}></div>
          <Box sx={{ width: 1, backgroundColor: '#fff' }}>
            <Box sx={{ height: '40vh', width: 1, mb: 2 }}>
              <DataGrid
                columns={columns2}
                rows={row2}
                components={{
                  Footer: Footer,
                  NoRowsOverlay: NoRowsOverlay,
                }}
              />
            </Box>
          </Box>
          <Box sx={{ width: 1, backgroundColor: '#fff' }}>
            <Box sx={{ height: '40vh', width: 1, mb: 2 }}>
              <DataGrid
                columns={columns3}
                rows={row3}
                components={{
                  Footer: Footer,
                  NoRowsOverlay: NoRowsOverlay,
                }}
              />
            </Box>
          </Box>
        </div>
      </div>
      {/* Making the table for site Updates using MUI */}
    </div>
  );
}
