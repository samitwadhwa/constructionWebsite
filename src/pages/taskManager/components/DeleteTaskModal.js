
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import axios from "axios";
const token = localStorage.getItem("token");
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
};




export default function DeleteTaskModal({ open, setOpen, taskId }) {
    const handleSubmit = (e) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/task-manager/delete-task/${taskId}`, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } }).then((result) => {
            console.log(result)
            setOpen(false);
            window.location.reload(false);
        }).catch(err => {
            console.log(err.response)
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
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                                <div sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography variant="h5" id="modal-title">
                                        <b> Are you sure ? </b>
                                    </Typography>
                                </div>
                            </div>
                            <div p={1} key={3} >
                                <Typography variant="h6" id="Name" key="name" sx={{ mb: 1 }}>
                                    Do you want to delete this task ?<br />Doing this will permanently delete the task.
                                </Typography>
                            </div>


                            <div p={1} key={5}>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Button variant="contained" color="secondary" onClick={handleClose} style={{ color: "#7B931B", backgroundColor: "#fff", border: "2px solid #7B931B", borderRadius: "15px", boxShadow: "0", padding: "0.5rem 3rem" }}>
                                        No
                                    </Button>
                                    <Button variant="contained" style={{ backgroundColor: "#7B931B", borderRadius: "15px", padding: "0.5rem 3rem" }} onClick={handleSubmit} >
                                        Yes
                                    </Button>

                                </div>
                            </div>
                        </Box>

                    </Container>
                </Box>

            </Modal>
        </div>
    );
}
