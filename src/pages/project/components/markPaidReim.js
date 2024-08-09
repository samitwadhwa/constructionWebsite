
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button'
import { Container } from '@mui/material';
import {  useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


function ReimbursementModel({open, setOpen, reqId}) {


  const token = localStorage.getItem('token');
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  };
 
    const [value,setValue] = useState(new Date());
    
  const navigate = useNavigate();
    // function for submiting the response of paid reimbursement Request!!!

    const handleSubmit = (e) => {
        console.log(value)
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/projects/reimbursement-request/${reqId}/confirm-payment`,{} ,{headers: { authorization: `Bearer: ${token}` } }).then(res => {
            console.log(res.data)
            setOpen(false);
            // navigate("/projects/:id/purchase-req")
            window.location.reload(false)

        }).catch(
            err => {
                console.log(err)
            }
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
                            <Box sx ={{flexGrow:1, display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                <Typography variant="h5" id="modal-title">
                                    <b> Mark as paid </b>
                                </Typography>
                            </Box>
                        <Box  >
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box style={{flexGrow:1, display: 'flex',       justifyContent: 'center', alignItems: 'center', marginTop:3}}>
                    Do you want to mark this request as paid?
                </Box>

                <Box display="flex" flexGrow={1} sx={{mt:2}}>
                    <Button variant="contained" color="secondary" style={{width:"50%",color:"#7B931B", background:"#fff", border:"2px solid #7B931B", borderRadius:"15px", boxShadow:"0"}} onClick={()=>setOpen(false)} >
                        close
                    </Button>
                    <Button variant="contained" type ="submit"  style={{marginLeft:10, width:"50%",background: "#7B931B", borderRadius:"15px"}} onClick={handleSubmit} >
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


export default ReimbursementModel