import React, { useEffect, useState } from "react";
import Header from "../components/header";
//import sidebar component
import MainSideBar from '../components/MainSideBar'
import AddIcon from '@mui/icons-material/Add';
import AddTaskModal from "./components/AddTaskModal"
import axios from "axios";
import PendingCardTM from "./components/PendingCardTM";
import CompletedCardTM from "./components/CompletedCardTM";
import OverdueCardTM from './components/OverdueCardTM';
import dayjs from 'dayjs';
import LocalisedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(LocalisedFormat);



export default function TaskManager({ id }) {
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [addTaskModal, setAddTaskModal] = useState(false);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/task-manager?status=pending`, { headers: { authorization: `Bearer ${token}` } }).then(async (result) => {
            setPendingTasks(result.data.data.reverse());
        });
    }, [pendingTasks]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/task-manager?status=completed`, { headers: { authorization: `Bearer ${token}` } }).then(async (result) => {
        setCompletedTasks(result.data.data.reverse());
        }); 
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/task-manager?status=overdue`, { headers: { authorization: `Bearer ${token}` } }).then(async (result) => {
            console.log(result.data.data.reverse());
        setOverdueTasks(result.data.data.reverse());
        });
    }, []);
    
    const taskManagerHeader = {
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem 0"
    }
    const addNewTaskBtn = {
        borderRadius: "0.7rem",
        padding: "0.4rem 1rem",
        color: "#fff",
        background: "#7B931B",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: "600",
        cursor: "pointer",
    }
    const pendingHeader = {
        color: "#fff",
        backgroundColor: "#A37DEF",
        padding: "0.5rem 1.5rem",
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        fontWeight: "600"
    }
    const completedHeader = {
        color: "#fff",
        backgroundColor: "#768C15",
        padding: "0.5rem 1.5rem",
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        fontWeight: "600"
    }
    
    const overdueHeader = {
        color: "#fff",
        backgroundColor: "#D46846",
        padding: "0.5rem 1.5rem",
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        fontWeight: "600" 
    }

    return (
        <div>
            <Header />
            <div className="Updates" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <MainSideBar sideState={4} />
                <div className="task-manager-container" style={{width:"76vw",marginLeft:"3rem"}}>
                    <div style={taskManagerHeader} >
                        <h3>Task manager</h3>
                        <button style={addNewTaskBtn} onClick={() => setAddTaskModal(true)}><AddIcon/>Add new task</button>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4" style={{padding:"0 0.5rem"}}>
                            <div>
                                <span style={pendingHeader}>Pending</span>
                                <div style={{ backgroundColor: "#EBE1FF", height: "51rem", marginTop: "0.35rem", display: "flex", flexDirection: "column",overflowY:"scroll" }}>
                                    {pendingTasks.map((task, index) => { 
                                        return (<PendingCardTM key={task._id} title={(task.assignedTo === undefined) ? "No such user" : task.assignedTo.name} description={task.description} id={task._id} type={task.type} deadLine={dayjs(task.deadLine.date).format('D MMM YYYY').toString()+dayjs('1/1/1 ' + task.deadLine.time).format(',hh:mm a')} name={(task.assignedTo === undefined) ? "No such user" : task.createdBy.name} location={task.project ? task.project.site_name + "," + task.project.location : null} comments={task.comments}  />)
                                    })}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4" style={{padding:"0 0.5rem"}}>
                            <div>
                                <span style={overdueHeader}>Overdue</span>
                                <div style={{ backgroundColor: "#F5C7C7", height: "51rem",marginTop:"0.35rem",display:"flex",flexDirection:"column",overflowY:"scroll" }}>
                                    {overdueTasks.map((task, index) => { 
                                        return (<OverdueCardTM key={task._id} title={(task.assignedTo === undefined) ? "No such user" : task.assignedTo.name} description={task.description} id={task._id} type={task.type} deadLine={dayjs(task.deadLine.date).format('D MMM YYYY').toString()+dayjs('1/1/1 ' + task.deadLine.time).format(',hh:mm a')} name={(task.assignedTo === undefined) ? "No such user" : task.createdBy.name} location={task.project ? task.project.site_name + "," + task.project.location : null} />)
                                    })}
                                </div>
                            

                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4" style={{padding:"0 0.5rem"}}>
                            <div>
                                <span style={completedHeader}>Completed</span>
                                <div style={{ backgroundColor: "#DAE8A0", height: "51rem",marginTop:"0.35rem",display:"flex",flexDirection:"column",overflowY:"scroll" }}>
                                    {completedTasks.map((task, index) => { 
                                        return (<CompletedCardTM key={task._id}
                                            title={(task.assignedTo === undefined) ? "No such user" : task.assignedTo.name} description={task.description} id={task._id} type={task.type} deadLine={dayjs(task.deadLine.date).format('D MMM YYYY').toString()+dayjs('1/1/1 ' + task.deadLine.time).format(',hh:mm a')} name={(task.assignedTo === undefined) ? "No such user" : task.createdBy.name} location={task.project ? task.project.site_name + "," + task.project.location : null} comments={task.comments} />)
                                    })}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            <AddTaskModal open={addTaskModal} setOpen={setAddTaskModal} />
            </div>
        </div>

    );
}
