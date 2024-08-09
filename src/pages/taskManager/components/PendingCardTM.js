import React, { useEffect, useState } from "react";
import '../../styles/style.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import DeleteTaskModal from "./DeleteTaskModal"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import StatusCompleteModal from "./StatusCompleteTaskModal"
export default function PendingCardTM({ title, location, description, size, id, type, deadLine, name, site_name, comments }) {
    const [addCompleteModal, setAddCompleteModal] = useState(false);
    const [deleteTaskModal, setDeleteTaskModal] = useState(false);
    const pendingCardOuter = {
        margin: "1rem",
        borderRadius: "0.5rem",
        backgroundColor: "#fff",
        height: "15rem",
        flexShrink:'0'
    }
    const pendingCardHeader = {
        display: "flex",
        justifyContent: "space-between",
        color: "#fff",
        backgroundColor: "#A37DEF",
        borderTopRightRadius: "0.5rem",
        borderTopLeftRadius: "0.5rem",
        padding: "0.3rem 0.5rem",
        alignItems: "center"
    }
    const pendingCardBody = {
        padding:"1rem"
    }
    const pendingCardBodyHeader = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
    }

    return (
        <div style={pendingCardOuter}>
            <div style={pendingCardHeader}>
                <h6 style={{ fontWeight: "bold" }}>{ title}</ h6>
                <DeleteOutlineIcon size="small" onClick={() => setDeleteTaskModal(true)} style={{cursor: "pointer"}} />
            </div>
            <div style={pendingCardBody}>
                <div style={pendingCardBodyHeader}>
                    <p>
                        {location!=null?<MapsHomeWorkOutlinedIcon />:<></>}
                        <span style={{ fontWeight: "600", margin: "0 0.2rem", fontSize: "0.8rem" }}>{location}</span>
                    </p>
                    <p style={{color:"#F4617B",fontSize:"0.8rem",fontWeight: "600"}}>{deadLine}</p>
                </div>
                <p style={{ fontWeight: "700", fontSize: "0.9rem" }}>{description}</p>
                <div style={{display: "flex", justifyContent:"space-between", flexGrow:1,fontSize: "0.8rem",alignItems: 'center'}}>
                    {type === "Risk" ?
                        <p style={{ marginLeft: "0.2rem", marginRight: "0.2rem", borderRadius: "2rem", padding: "0.2rem 0.8rem", backgroundColor: "#7B88FF", color: "#fff" }}>Risk</p> : (type === "Issue" ?
                            <p style={{ marginLeft: "0.2rem", marginRight: "0.2rem", borderRadius: "2rem", padding: "0.2rem 0.8rem", backgroundColor: "#FF7BEA", color: "#fff" }}>Issue</p>:<p style={{marginLeft:"0.2rem",marginRight:"0.2rem",borderRadius:"2rem",padding:"0.2rem 0.8rem",backgroundColor:"#F1AD46",color:"#fff"}}>Task</p> )
                    }
                    <p style={{color:"#768C15",fontWeight: "600",cursor: "pointer"}}onClick={() => setAddCompleteModal(true)} ><CheckCircleOutlineOutlinedIcon size="small"/><span>Mark as complete</span></p>
                </div>
                {/* <hr style={{ margin: "0.1rem 0" }} /> */}
                <div style={{fontSize:"1rem"}}>
                    <span style={{marginBottom:"0.3rem"}}>Assigned By : </span>
                    <span style={{ fontWeight: "bold" }}>{name}</span>
                </div>
            </div>
            <StatusCompleteModal open={addCompleteModal} setOpen={setAddCompleteModal} taskId={id} />
            <DeleteTaskModal open={deleteTaskModal} setOpen={setDeleteTaskModal} taskId={id} />
        </div>
                                
    );
}
