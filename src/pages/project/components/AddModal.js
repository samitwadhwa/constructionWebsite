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

function AddModal({ open, setOpen, Data }) {
  const [name, setName] = React.useState(Data.name);
  console.log(Data);
  console.log(Data.name + ' ' + name);
  const [email, setEmail] = React.useState(Data.email);

  const [id, setid] = React.useState(Data.id);
  const [role, setRole] = React.useState(Data.phone);
  const [password, setPassword] = React.useState(Data.password);

  const roles = [
    { value: 'Admin', dept: 'Admin' },
    { value: 'Manager', dept: 'operations' },
    { value: 'Associate', dept: 'Employee' },
    { value: 'Purchase Manager', dept: 'Purchase' },
    { value: 'Site Engineer', dept: 'Sales' },
  ];

  useEffect(() => {
    setName(Data.name);
    setEmail(Data.email);
    setRole(Data.phone);
    setPassword(Data.password);
    setid(Data.id);
    // setDepartment(roles.dept);
  }, [Data]);
  const EditPost = (id) => {
    let token = localStorage.getItem('token');
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/team/update-team/${id}`,
        {
          email: email,
          password: password,
          role: role,
          name: name,
        },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((result) => {
        console.log(result);
        // showAlert("Task Edited Successfully!", "success");
        window.location.reload(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      if (window.confirm('Do you Really want to Edit Team member?'))
        EditPost(id);
    } else {
      let department = roles.find((r) => r.value === role).dept;
      const Details = {
        name: name,
        email: email,
        role: role,
        password: password,
        //  department: Department
      };

      let token = localStorage.getItem('token');

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/team/add-team`, Details, {
          headers: { authorization: `Bearer: ${token}` },
        })
        .then((res) => {
          console.log(res);
          setOpen(false);
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = () => setOpen(false);

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
                      {Data.name === undefined
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
                </Box>
                <Box p={2} key={2}>
                  <Typography variant='h6' id='role' key='role' sx={{ mb: 1 }}>
                    Role
                  </Typography>
                  <CustomTextField
                    key='rolef'
                    name='role'
                    id='rolefield'
                    label='Enter Role'
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    variant='outlined'
                    select
                    fullWidth
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </CustomTextField>
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
                </Box>
                {Data.name === undefined ? (
                  <Box p={2} key={4}>
                    <Typography
                      variant='h6'
                      id='pass'
                      key='pass'
                      sx={{ mb: 1 }}
                    >
                      Password
                    </Typography>

                    <CustomTextField
                      key='passf'
                      name='pass'
                      id='passfield'
                      label='Enter the password'
                      defaultValue={password}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      variant='outlined'
                      fullWidth
                    />
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
                      {Data.name === undefined
                        ? 'Add member'
                        : 'confirm changes'}
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

export default AddModal;
