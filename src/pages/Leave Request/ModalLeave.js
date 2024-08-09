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
import "./leave.css"
import { Container } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import env from 'react-dotenv';
import { DateRangePicker } from 'react-date-range';
import {addDays} from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';


function ModelLeave({ open, setOpen, Data }) {
    
    
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
    };
    const handleSelect = (ranges) => {
        console.log(ranges); // native Date object
      }
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
    
    // const selectionRange = {
    //     startDate: new Date(),
    //     endDate: addDays(new Date() , 7),
    //     key: 'selection',
    //   }
    const [range , setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date() , 7),
            key: 'selection',
        }
    ])
 

  const token = localStorage.getItem('token');
const[Reason , setReason] =  React.useState({});
  useEffect(() => {
//    setReason(Data.Reason);
  }, [Data]);

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}/api/projects/show-projects`, {
//         headers: { authorization: `Bearer: ${localStorage.getItem('token')}` },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//         setProjectObjects(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
  //  {console.log(project.site_name)}
 
  


  const handleClose = () => {
    // setFormErrors({});
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
                      Apply for leave
                    </b>
                  </Typography>
                </Box>
                <Box>
                  <IconButton aria-label='close' onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <form >
                <div className="component-date">

              <DateRangePicker
        ranges={range}
        onChange={item => setRange([item.selection])}
        editableDateInputs = {true}
        moveRangeOnFirstSelection = {false}
        months = {1}
        direction = "horizontal"
        classname = "calenderElement"
        
      />
                
                <Box p={2} key={1} 
                style = {{
                    width: "21rem"
                }}
                >
                  <Typography variant='h6' id='Name' key='name' sx={{ mb: 1 }}>
                    Reason:
                  </Typography>
                  <textarea
                    rows={1}
                    columns = {3}
                    key='namef'
                    name='name'
                    id='namefield'
                    style={{
                        width: "100%",
                        border: "1px solid rgb(123, 147, 27)",
                        padding: "9px",
                        borderRadius: "5px",
                    }}
                    // label='Enter Name'
                    // value={name}
                    // defaultValue={name}
                    // onChange={(e) => {
                    //   setName(e.target.value);
                    // }}
                    // variant='outlined'
                    // fullWidth
                    // required
                  />
                </Box>
                
                <Box p={2} key={5}>
                  <Box display='flex' flexGrow={1}>
                    <Button
                      variant='contained'
                      type='submit'
                      style={{
                        
                        width: '19rem',
                        fontSize : "1rem",
                        background: '#7B931B',
                        borderRadius: '4px',
                        color: 'white',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: '700',
                      }}
                    >
                Apply for leave
                    </Button>
                   
                  </Box>
                </Box>
                </div>
              </form>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

export default ModelLeave;
