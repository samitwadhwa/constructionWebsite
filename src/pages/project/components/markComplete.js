
import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useEffect , useState } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import env from "react-dotenv";
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ProjectModel({open, setOpen, id, pid}) {


  // const [complete , setComplete] = useState([]);
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  };
  
  const navigate = useNavigate();

  
  // function for submiting the response of confirmation of completed purchase Request!!!
  const handleSubmit = (e) => {
    
    const token = localStorage.getItem('token');
    axios.put(`${process.env.REACT_APP_BASE_URL}/api/projects/${id}/purchase-request/${pid}/complete` ,{},{headers: { authorization: `Bearer: ${token}` } }).then(res => {
      console.log(res.data)
      
      
            setOpen(false);
            window.location.reload(false);
         

    }).catch(
        err => {
            console.log(err)
        }
    )
    
  }
  // const token = localStorage.getItem('token');

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
              <Container maxWidth = "sm" fixed>
                <Box flexGrow = {1} sx={{
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
            <Box sx ={{flexGrow:1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <Typography  variant="h5" id="modal-title">
           
               <b > Mark as Completed </b>
               
            </Typography>
            </Box>
            <Box  >
            <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            </Box>
            </Box>
            <Box style={{flexGrow:1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:3}}>
           Do you want to mark this request as completed?
           </Box>

           <Box display="flex" flexGrow={1} sx={{mt:2}}>
                  <Button variant="contained" color="secondary" style={{width:"50%",color:"#7B931B", background:"#fff", border:"2px solid #7B931B", borderRadius:"15px", boxShadow:"0"}} onClick={()=>setOpen(false)} >
                      close
                    </Button>
                    <Button  variant="contained" type ="submit"  style={{marginLeft:10, width:"50%",background: "#7B931B", borderRadius:"15px"}} onClick={handleSubmit} >
                      confirm
                    </Button> 
                    
                  </Box>
              </Box>  
                         
              </Container>
            </Box>
          
        </Modal>
      
      </div>
    );
}


export default ProjectModel