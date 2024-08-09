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
import env from 'react-dotenv';

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
      borderColor: '#7B931B',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const myValidation = {
  color: 'red',
};

const validate = ({ name, project, email, phone }) => {
  const errors = {};
  //regex for vailidating email
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    errors.email = 'Email is required!';
  } else if (!regex.test(email)) {
    errors.email = 'Please Enter a Valid Email!';
  }
  if (!project) {
    errors.project = 'Project is required!';
  }
  if (!name) {
    errors.name = 'Name is required!';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters!';
  }
  if (!phone) {
    errors.phone = 'Phone is required!';
  } else if (phone.length !== 10) {
    errors.phone = 'Phone number must be 10 digits!';
  }
  return errors;
};

function EditModelClient({ open, setOpen, Data }) {
  const [name, setName] = React.useState(Data.name);
  const [email, setEmail] = React.useState(Data.email);
  const [site, setSite] = React.useState('');
  const [formErrors, setFormErrors] = React.useState({});

  const [projectObjects, setProjectObjects] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState();
  const [id, setid] = React.useState(Data.id);
  //   const [Mobile,setMobile] = React.useState(Data.mobile);
  const [password, setPassword] = React.useState(Data.password);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // console.log(Data)
    setName(Data.name);
    setEmail(Data.email);
    setPassword(Data.phone);
    setid(Data.id);
    setSite(Data.project);
  }, [Data]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/projects/show-projects`, {
        headers: { authorization: `Bearer: ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setProjectObjects(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //  {console.log(project.site_name)}
  const EditPost = (id) => {
    let token = localStorage.getItem('token');
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/client/edit-client/${id}`,
        {
          name: name,
          project: site,
          email: email,
        },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((result) => {
        console.log(result);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        // window.location.reload(false);
        alert('Something went wrong please try later');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    const FormValues = {
      name: name,
      email: email,
      project: site,
      phone: password,
    };
    const errors = validate(FormValues);
    if (id) {
      delete errors.phone;
    }
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setFormErrors(errors);
      return;
    }
    if (id) {
      if (window.confirm('Do you really want to update client?')) EditPost(id);
    } else {
      const Details = {
        name: name,
        email: email,
        project: site,
        phone: password,
        //  department: Department
      };
      console.log('client details being sent', Details);
      let token = localStorage.getItem('token');

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/client/add-client`,
          Details,
          { headers: { authorization: `Bearer: ${token}` } }
        )
        .then((res) => {
          console.log(res);
          setOpen(false);
          window.location.reload(false); // * reloads the pages
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  useEffect(() => {
    console.log(site);
  }, [site]);

  const handleClose = () => {
    setFormErrors({});
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Container maxWidth='sm' fixed>
            <Box
              flexGrow={1}
              sx={{
                border: '1px solid #C6C2C2',
                borderRadius: '1rem',
                boxShadow: 5,
                p: 4,
              }}
              style={{
                background: 'white',
              }}
            >
              <Box display='flex' alignItems='center'>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='h5' id='modal-title'>
                    <b>
                      {' '}
                      {Data.name === null
                        ? 'Enter Details'
                        : 'Edit Details'}{' '}
                    </b>
                  </Typography>
                </Box>
                <Box>
                  <IconButton aria-label='close' onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Box p={2} key={1}>
                  <Typography variant='h6' id='Name' key='name' sx={{ mb: 1 }}>
                    Name
                  </Typography>
                  <CustomTextField
                    key='namef'
                    name='name'
                    id='namefield'
                    label='Enter Name'
                    value={name}
                    defaultValue={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    variant='outlined'
                    fullWidth
                    required
                  />
                  <p style={myValidation}>{formErrors.name}</p>
                </Box>
                <Box p={2} key={2}>
                  <Typography variant='h6' id='proj' key='proj' sx={{ mb: 1 }}>
                    Projects
                  </Typography>
                  <CustomTextField
                    key='projf'
                    name='proj'
                    id='projfield'
                    label='Enter Project'
                    value={site}
                    onChange={(e) => {
                      setSite(e.target.value);
                    }}
                    variant='outlined'
                    select
                    fullWidth
                  >
                    {projectObjects.map((project) => (
                      <MenuItem key={project._id} value={project._id}>
                        {project.site_name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                  <p style={myValidation}>{formErrors.project}</p>
                </Box>

                <Box p={2} key={3}>
                  <Typography
                    variant='h6'
                    id='email'
                    key='email'
                    sx={{ mb: 1 }}
                  >
                    Email
                  </Typography>
                  <CustomTextField
                    key='emailf'
                    name='email'
                    id='emailfield'
                    label='Enter Email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    variant='outlined'
                    fullWidth
                    required
                  />
                  <p style={myValidation}>{formErrors.email}</p>
                </Box>
                {Data.name === null ? (
                  <Box p={2} key={4}>
                    <Typography
                      variant='h6'
                      id='pass'
                      key='phone'
                      sx={{ mb: 1 }}
                    >
                      Mobile Number
                    </Typography>

                    <CustomTextField
                      key='passf'
                      name='pass'
                      id='passfield'
                      label='Enter mobile number'
                      defaultValue={password}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      variant='outlined'
                      fullWidth
                    />
                    <p style={myValidation}>{formErrors.phone}</p>
                  </Box>
                ) : null}
                <Box p={2} key={5}>
                  <Box display='flex' flexGrow={1}>
                    <Button
                      variant='contained'
                      type='submit'
                      style={{
                        marginRight: 10,
                        width: '50%',
                        background: '#7B931B',
                        borderRadius: '15px',
                      }}
                    >
                      {Data.name === null ? 'Add Client' : 'confirm changes'}
                    </Button>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={handleClose}
                      style={{
                        width: '50%',
                        color: '#7B931B',
                        background: '#fff',
                        border: '2px solid #7B931B',
                        borderRadius: '15px',
                        boxShadow: '0',
                      }}
                    >
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

export default EditModelClient;
