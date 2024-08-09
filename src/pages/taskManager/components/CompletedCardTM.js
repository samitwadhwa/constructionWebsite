import React, { useEffect, useState } from "react";
import '../../styles/style.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import DeleteTaskModal from "./DeleteTaskModal"
export default function CompletedCardTM({ title, location, size, id, description, type, deadLine, name, comments }) {
    const [deleteTaskModal, setDeleteTaskModal] = useState(false);
    const completedCardOuter = {
        margin: "1rem",
        borderRadius: "0.5rem",
        backgroundColor: "#fff",
        height: "15rem",
        flexShrink:'0'
    }
    const completedCardHeader = {
        display: "flex",
        justifyContent: "space-between",
        color: "#fff",
        backgroundColor: "#768C15",
        borderTopRightRadius: "0.5rem",
        borderTopLeftRadius: "0.5rem",
        padding: "0.3rem 0.5rem",
        alignItems: "center"
    }
    const completedCardBody = {
        padding:"1rem"
    }
    const completedCardBodyHeader = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
    }

    return (
        <div style={completedCardOuter}>
            <div style={completedCardHeader}>
                <h6 style={{ fontWeight: "bold" }}>{title}</h6>
                <DeleteOutlineIcon size="small" onClick={() => setDeleteTaskModal(true)} style={{cursor: "pointer"}} />
            </div> 
            <div style={completedCardBody}>
                <div style={completedCardBodyHeader}>
                    <p>
                        {location!=null?<MapsHomeWorkOutlinedIcon />:<></>}
                        <span style={{ fontWeight: "600", margin: "0 0.2rem", fontSize: "0.8rem" }}>{location}</span>
                    </p>
                    <p style={{ color: "#F4617B", fontSize: "0.8rem", fontWeight: "600" }}>{deadLine}</p>
                </div>
                <p style={{ fontWeight: "700", fontSize: "0.9rem" }}>{description}</p>
                <div style={{ display: "flex", flexGrow: 1, fontSize: "0.8rem", alignItems: 'center' }}>
                    {type === "Risk" ?
                        <p style={{ marginLeft: "0.2rem", marginRight: "0.2rem", borderRadius: "2rem", padding: "0.2rem 0.8rem", backgroundColor: "#7B88FF", color: "#fff" }}>Risk</p> : (type === "Issue" ?
                            <p style={{ marginLeft: "0.2rem", marginRight: "0.2rem", borderRadius: "2rem", padding: "0.2rem 0.8rem", backgroundColor: "#FF7BEA", color: "#fff" }}>Issue</p>:<p style={{marginLeft:"0.2rem",marginRight:"0.2rem",borderRadius:"2rem",padding:"0.2rem 0.8rem",backgroundColor:"#F1AD46",color:"#fff"}}>Task</p> )
                }
                </div>
                <div style={{fontSize:"1rem"}}>
                    <span style={{marginBottom:"0.3rem"}}>Assigned By : </span>
                    <span style={{ fontWeight: "bold" }}>{name}</span>
                </div>
            </div>
            <DeleteTaskModal open={deleteTaskModal} setOpen={setDeleteTaskModal} taskId={id} />
        </div>
                                
    );
}
