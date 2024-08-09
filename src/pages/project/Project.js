
import React, { useState, useEffect,useContext } from "react";
import SearchIcon from '@mui/icons-material/Search';
import proj_styles from './styles/Project.module.css';
import '../styles/style.css'
import AddIcon from '@mui/icons-material/Add';
import Cards from './components/Cards';
import Header from '../components/header';
import EditModel from "../components/EditModal";
import AddModal from "./components/AddModal";
import ProjectModal from "./components/ProjectModal";
import AuthContext
  from "../../Context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

//import sidebar component
import MainSideBar from '../components/MainSideBar'



export default function AddTask() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const [show, setshow] = useState(false);
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [AddModalOpen, setAddModalOpen] = useState(false);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [Analytics, setAnalytics] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects/show-projects`, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } })
      .then(res => {
        setIsLoading(false);

        console.log(res.data);
        setProjects(res.data.data.reverse())
        // window.location.reload(false);

      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/over-view`, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } })
      .then(res => {
        setIsLoading(false);

        console.log(res.data)
        setAnalytics(res.data)
        // window.location.reload(false);

      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const cardStyle = {
    width: "20rem",
    margin: "1rem",
  }
  const Homei = () => {
    window.location.reload(false);
  }
  const myContent2 = {
    marginBottom: "-18rem",
    marginTop: "2rem",
    height: "45.7rem",
  }
  const myContent3 = {
    // marginBottom : "-18rem",
    overflow: 'visible',
    marginTop: "1rem",
    height: "44.7rem",
    marginLeft: "2rem",

  }
  const myContent4 = {
    // marginBottom : "-18rem",
    marginTop: "1rem",
    height: "45.7rem",
  }
  const myProjectBtn = {
    borderRadius: "10.2943px",
    padding: "0.4rem 1.5rem",
    backgroundColor: "#7B931B",
    color: "white",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "800",
    opacity: auth.role === "Admin" ? "1" : "0.5"
  }
  const myAdd = {
    fontSize: "small",
    marginLeft: "-1rem",
    marginTop: "-0.3rem",
    marginRight: "0.3rem",
  }
  const myForm = {
    marginLeft: "1rem",
    marginRight: "9rem",
  }
  const onInput = {
    width: "21rem",
    padding: "4px 6px",
    borderRadius: "5px",
    border: "2px solid #D7EB8B",
    color: "#A8A8A8",
    backgroundColor: "#ffff",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "400",
  }
  const myDiv = {
    maxWidth: "75vw",
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(18rem, 1fr))',
    gap: '2rem',
    paddingBottom: '2rem'  // !remove this later on   
  }
  return (
    <div>
      <Header />
      <div className="Updates">

        <MainSideBar sideState={2}/>
        <div className="content-tabs" style={{ width: "91rem" }}>
          <div className={toggleUpdateState === 1 ? "content  active-content" : "content"} style={myContent3} >
            <div className={proj_styles.heading}>
              <h3 className="my-4" style={{
                marginLeft: "1.1rem", fontWeight: "800", fontFamily: "'Montserrat', sans-serif",
              }}>All Projects</h3>
              <div>
                <input style={onInput} type="text" placeholder="Search project" onChange={(event) => {
                  setsearchTerm(event.target.value);
                }} /> <SearchIcon style={{ color: "#A8A8A8" }} />
              </div>
              {auth.role === "Admin" && <button style={myProjectBtn} onClick={() => { setProjectModalOpen(true) }}><AddIcon style={myAdd} />Add new project</button>}
            </div>
            <div>

              <div style={myDiv}>


                {projects.filter((val) => {
                  if (searchTerm == "") {
                    return val
                  }
                  else if (val.site_name.toLowerCase().search(searchTerm.toLowerCase()) === 0) {
                    return val
                  }
                }).map((val, key) =>

                (!val.completed &&
                  <Cards
                    key={key}
                  title={val.site_name}
                  uID={val.uid}
                    location={val.location}
                    size={val.size}
                    id={val._id}
                    completed={val.completed} />
                )
                )}
                {projects.filter((val) => {
                  if (searchTerm == "") {
                    return val
                  }
                  else if (val.site_name.toLowerCase().search(searchTerm.toLowerCase()) === 0) {
                    return val
                  }
                }).map((val, key) =>
                (val.completed &&
                  < Cards
                    key={key}
                  title={val.site_name}
                  uID={val.uid}
                    location={val.location}
                    size={val.size}
                    id={val._id}
                    completed={val.completed} />
                ))}

              </div>
              {isLoading ? <LoadingSpinner /> : null}
            </div>
            <div className="row" style={{ marginLeft: "4rem" }} >

            </div>
          </div>
        </div>

      </div>
      <EditModel open={editModalOpen} setOpen={setEditModalOpen} Data={{}} />
      <ProjectModal open={projectModalOpen} setOpen={setProjectModalOpen} data={{}} />
      <AddModal open={AddModalOpen} setOpen={setAddModalOpen} Data={{}} />

    </div>
  );
}
