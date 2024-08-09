
import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
// import AddTaskModal from "./AddTaskModal"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import env from "react-dotenv";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
};




function EditModel({ open, setOpen }) {

  const [site, setSite] = React.useState('');

  const [description, setDescription] = React.useState('');

  // const [work,setWork] = React.useState('');
  const [assignedTo, setAssignedTo] = React.useState('');
  const [deadline, setDeadline] = React.useState(new Date());
  const [members, setMembers] = React.useState([]);
  const [dTime, setDTime] = React.useState(new Date());
  const [memberObjects, setMemberObjects] = React.useState([]);
  const [projectObjects, setProjectObjects] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const token = localStorage.getItem('token')
  const [work, setWork] = React.useState();
  const workOptions = [
    "Risk",
    "Issue",
    "Task"
  ]

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/team/get-team`, { headers: { authorization: `Bearer: ${token}` } }).then(async (result) => {
      console.log(result.data);

      setMemberObjects(result.data.data);

      const names = result.data.data.map(member => member.name);
      setMembers(names);

    }).catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects/show-projects`, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } })
      .then(res => {
        console.log(res.data)
        setProjectObjects(res.data.data)
        const siteNames = res.data.data.map(project => project.site_name);
        setProjects(siteNames);
        // window.location.reload(false);

      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const handleClose = () => setOpen(false);
  const handleSubmit = (e) => {
    handleClose();
    e.preventDefault();
    handleClose();
    const memberId = memberObjects.find(member => member.name === assignedTo)._id;
    
    var d = new Date(deadline),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;
 var date_new = [year, month, day].join('-');
    var data = {}
    if (site !== '') {

      let projectId = projectObjects.find(project => project.site_name === site)._id;
      console.log(projectId)
      data = {
        projectId: projectId,
        description,
        type: work,
        assignedTo: memberId,
        deadLine: {
          date: date_new,
          time: dTime.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' })
        },
      }


    }
    else {

      data = {
        description,
        type: work,
        assignedTo: memberId,
        deadLine: {
          date: date_new,
          time: dTime.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' })
        },
      }
    }



    console.log('task data being sent:', data);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/task-manager`, data, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } })
      .then(
        res => {
          console.log(res)
          window.location.reload(false);
        }

      ).catch(err => {
        console.log(err)
      })
  }

  return (
    <div>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Box sx={style}>
          <Container maxWidth='sm' fixed>
            <Box flexGrow={1} sx={{
              border: '1px solid #C6C2C2',
              borderRadius: '1rem',
              boxShadow: 5,
              p: 4,

            }}
              style={{
                background: 'white',
              }}
            >
              <Box display="flex" alignItems="center">
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h5" id="modal-title">
                    <b>  </b>
                  </Typography>
                </Box>
                <Box  >
                  <IconButton aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <form onSubmit={(e) => { handleSubmit(e) }}>
                <Box p={1} key={3} >
                  <Typography variant="h6" id="Name" key="name" sx={{ mb: 1 }}>
                    Site
                  </Typography>
                  <TextField key="namef" name="name" id="namefield" label="Enter Site Name" value={site} defaultValue={site} onChange={(e) => { setSite(e.target.value); }} variant="outlined" fullWidth select   >
                    <MenuItem key={'no site'} value={''}>
                      no site
                    </MenuItem>
                    {projects.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}

                  </TextField>
                </Box>
                <Box p={1} key={1} >
                  <Typography variant="h6" id="Name" key="name" sx={{ mb: 1 }}>
                    Description
                  </Typography>
                  <TextField key="namef" name="name" id="namefield" label="Enter the Description" value={description} defaultValue={description} onChange={(e) => { setDescription(e.target.value); }} variant="outlined" fullWidth required />
                </Box>
                <Box p={1} key={2} >
                  <Typography variant="h6" id="Name" key="name" sx={{ mb: 1 }}>
                    Type of work
                  </Typography>
                  <TextField key="namef" name="name" id="namefield" label="Enter the type of work" value={work} defaultValue={work} onChange={(e) => { setWork(e.target.value); }} variant="outlined" fullWidth select required  >
                    {workOptions.map((option) => (

                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}





                  </TextField>
                </Box>
                <Box p={1} key={2}>
                  <Typography variant="h6" id="role" key="role" sx={{ mb: 1 }}>
                    Assigned to
                  </Typography>
                  <TextField key="rolef" name="role" id="rolefield" label="Assigned to?" value={assignedTo} onChange={(e) => { setAssignedTo(e.target.value); }} variant="outlined" select fullWidth >
                    {members.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box p={1} key={3}>
                  <Typography variant="h6" id="email" key="email" sx={{ mb: 1 }}>
                    Deadline
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Basic example"
                        value={deadline}
                        onChange={(newValue) => {
                          setDeadline(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <TimePicker


                        label="Basic example"
                        value={dTime}
                        onChange={(newValue) => {
                          setDTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </Box>

                <Box p={1} key={5}>
                  <Box display="flex" flexGrow={1} >
                    <Button variant="contained" type="submit" style={{ marginRight: 10, width: "50%", background: "#7B931B", borderRadius: "15px" }} >
                      Add Task
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} style={{ width: "50%", color: "#7B931B", background: "#fff", border: "2px solid #7B931B", borderRadius: "15px", boxShadow: "0" }}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>

          </Container>
        </Box>

      </Modal>
    </div>
  );
}

export default EditModel