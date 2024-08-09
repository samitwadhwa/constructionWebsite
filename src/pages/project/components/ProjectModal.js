
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment, TextField } from '@mui/material';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import './ProjectModal.css';
import { setDefaultLocale } from 'react-datepicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
};

const CustomTextField = styled(TextField)({

  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'green',
    },

    '& fieldset': {
      borderRadius: '50px',
      borderColor: "#7B931B",
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});




function ProjectModel({ open, setOpen, data }) {
  console.log('prop',data);
  // const DeletePost = (id) =>{
  //   // setIsLoading(true);
  //   const token = localStorage.getItem("token");
  //   axios.delete(`${process.env.REACT_APP_BASE_URL}/api/projects/delete-project/${id}`, {headers: { authorization: `Bearer: ${token}` } }).then((result) =>{
  //     console.log(result)

  //     setIsLoading(false);
  //     showAlerts("Deleted successfully!", "success")

  //     window.location.reload(false);
  //     // console.log(user);
  //   })

  //     }
  const [name, setName] = React.useState(data.site_name);
  const [projectID, setProjectID] = React.useState('');
  const [location, setLocation] = React.useState(data.location);
  const [siteSize, setSiteSize] = React.useState(data.size);
  const [screen1, setScreen1] = React.useState(true);
  const [member, setMember] = React.useState({ _id: '', name: '' });
  const [projectMembers, setProjectMembers] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [selMembers, setSelMembers] = React.useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/team/get-team`, { headers: { authorization: `Bearer: ${token}` } }).then(async (result) => {
      console.log(result.data);
      setMembers(result.data.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  // useEffect(() => {
  //   console.log(member)
  // }, [member])

  useEffect(() => {
    if (data.team && data.team.length > 0) {
      setProjectMembers(data.team);
      setSelMembers(data.team);
      setProjectID(data.uid.split('-')[1])
    }
  }, [data]);

  const memberAdd = () => {
    const selectedMember = selMembers.find(obj => obj._id === member._id);
    if (selectedMember === undefined) {
      setSelMembers([...selMembers, member]);
      console.log('sel members', selMembers)
    }
    else {
      alert('Member already added');
    }
  }

  const memberRemove = (index) => {
    let selectedMembers = [...selMembers];
    selectedMembers.splice(index, 1);
    setSelMembers(selectedMembers);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data._id) setProjectMembers(data.team)
    setScreen1(false);
  }
  // const token = localStorage.getItem('token');
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    let project = {
      site_name: name,
      uid: 'VC-' + projectID,
      location: location,
      size: siteSize,
      team: selMembers,

    }
    console.log('data being submitted', project);
    console.log(data._id)
    if (data._id) {
      axios.put(`${process.env.REACT_APP_BASE_URL}/api/projects/update-project/${data._id}`, project, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } })
        .then(async (result) => {
          console.log(result.data);
          setOpen(false);
          window.location.reload(false);

        }).catch(err => {
          console.log(err);
        });
    }

    else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/projects/add-project`, project, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } }).then(
        (res) => {
          // const arr =  (res);
          window.location.reload(false);

          console.log(res);
          setOpen(false);
        });
    }
  };

  const Screen2 = () => {
    return (
      <form onSubmit={(e) => handleSubmit1(e)}>
        <Box p={2} key={1}>
          <Typography variant="h6" id="Name" key="name" sx={{ mb: 1 }}>
            Add Team Member
          </Typography>
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <CustomTextField key={member._id} name={member._id} id="namefield" label="Enter Name" value={member.name} defaultValue={member.name} variant="outlined" size="small" select fullWidth   >
              {members.map((m) => (
                <MenuItem onClick={() => setMember({ _id: m._id, name: m.name })} name={m._id} value={m.name}>
                  {m.name}
                </MenuItem>
              ))}

            </CustomTextField>
            <Button variant="contained" color="primary" style={{ marginLeft: 10, width: 100, borderRadius: 25, background: "#7B931B" }} onClick={memberAdd}>
              Add
            </Button>
          </div>
          <div style={{ width: "100%", background: "#E9E9E9", height: 300, marginTop: 10, borderRadius: 25, padding: 20, }}>
            <div className='project-modal-member-box' style={{ flexGrow: 1, overflowY: "scroll", maxHeight: 300, height: 260 }}>
              {selMembers.map((member, index) => (
                <div variant="body1" style={{ marginBottom: 10, background: "white", width: "90%", padding: "5px", flexGrow: 1, display: "flex", borderRadius: 10, marginRight: "5%", marginLeft: "5%" }}>

                  <div style={{ flexGrow: 1 }}>{member.name}</div>
                  <IconButton aria-label="close" onClick={() => { memberRemove(index) }} style={{ justifySelf: "flex-end", alignSelf: "flex-end", display: "flex", }}>
                    <CloseIcon size="small" fontSize='small' />
                  </IconButton>
                </div>

              ))}
            </div>
          </div>
        </Box>

        <Box p={2} key={5}>
          <Box display="flex" flexGrow={1} >
            <Button variant="contained" color="secondary" style={{ width: "50%", color: "#7B931B", background: "#fff", border: "2px solid #7B931B", borderRadius: "15px", boxShadow: "0" }} onClick={() => setScreen1(true)}>
              Back
            </Button>
            <Button variant="contained" type="submit" style={{ marginLeft: 10, width: "50%", background: "#7B931B", borderRadius: "15px" }} >
              Submit
            </Button>

          </Box>
        </Box>
      </form>
    )
  }





  const handleClose = () => setOpen(false);

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
          <Container maxWidth="sm" fixed>
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
                    {data.site_name ?
                      <b> Edit Project </b>
                      : <b> Add New Project </b>
                    }
                  </Typography>
                </Box>
                <Box  >
                  <IconButton aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              {screen1 && <form onSubmit={(e) => handleSubmit(e)}>
                <Box p={2} key={1}>
                  <Typography variant="h6" id="Name" key="name" sx={{ mb: 1 }}>
                    Project Name
                  </Typography>
                  <CustomTextField key="names" name="names" id="namefields" label="Enter Name" value={name} defaultValue={data.site_name} onChange={(e) => { setName(e.target.value); }} variant="outlined" fullWidth required />
                </Box>
                <Box p={2} key={2}>
                  <Typography variant="h6" id="projectId" key="projectId" sx={{ mb: 1 }}>
                    Project ID
                  </Typography>
                  <CustomTextField key="projectID" name="projectID" id="projectIDfields" label="Enter Project ID" value={projectID} type="number" defaultValue={data.uid} onChange={(e) => { setProjectID(e.target.value); }} variant="outlined" fullWidth required />
                </Box>

                <Box p={2} key={3}>
                  <Typography variant="h6" id="email" key="email" sx={{ mb: 1 }}>
                    Location
                  </Typography>
                  <CustomTextField key="location" name="location" id="location" label="Enter Location" value={location} defaultValue={data.location} onChange={(e) => { setLocation(e.target.value); }} variant="outlined" fullWidth required />
                </Box>
                <Box p={2} key={4}>
                  <Typography variant="h6" id="pass" key="pass" sx={{ mb: 1 }} >
                    Size(sq. ft)
                  </Typography>
                  <CustomTextField key="site_size" name="site_size" id="site_size" label="Enter Size" value={siteSize} defaultValue={data.size} onChange={(e) => { setSiteSize(e.target.value); }} variant="outlined" fullWidth required />
                </Box>
                <Box p={2} key={5}>
                  <Box display="flex" flexGrow={1} >
                    <Button variant="contained" color="secondary" onClick={handleClose} style={{ width: "50%", color: "#7B931B", background: "#fff", border: "2px solid #7B931B", borderRadius: "15px", boxShadow: "0" }}>
                      Cancel
                    </Button>
                    <Button variant="contained" type="submit" style={{ marginLeft: 10, width: "50%", background: "#7B931B", borderRadius: "15px" }} >
                      Next
                    </Button>
                  </Box>
                </Box>
              </form>}
              {screen1 || <Screen2 />}
            </Box>

          </Container>
        </Box>

      </Modal>

    </div>
  );
}


export default ProjectModel