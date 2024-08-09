import axios from 'axios';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../Context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import ProjectSideBar from './components/ProjectSideBar';
import '../styles/style.css';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import CardsDoc from './components/CardsDoc';

function siteDocuments() {
  const { auth, setAuth } = useContext(AuthContext);
  const [file, setFiles] = useState('');
  const navigate = useNavigate();
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const [first, setFirst] = useState(false);
  const { id } = useParams();
  const [project, setProjects] = useState([]);
  const [Document, setDocument] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');

  const content = {
    background: 'rgba(118, 123, 106, 0.1)',
    width: '100%',
    height: '95vh',
  };
  const Documentbtn = {
    clear: 'both',
    // display: "inline-block",
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    border: '1px solid rgb(123, 147, 27)',
    // marginTop: "-1rem",
    position: 'relative',
    top: '-2rem',
    // position: "absolute",
    /* display: flex; */
    borderRadius: '10.2943px',
    padding: '0.4rem 1.5rem',
    marginLeft: '24rem',
    backgroundColor: '#7B931B',
    color: 'white',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '800',
  };
  const handleFile = (e) => {
    console.log(e.target.files[0].name);
    setFiles(e.target.files[0]);
  };
  const DeletePost = (id) => {
    if (window.confirm('Do you Really want to mark as delete?')) {
      axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/api/projects/delete-file/${id}`,
          { headers: { authorization: `Bearer: ${token}` } }
        )
        .then((result) => {
          console.log(result.data.data);

          setIsLoading(false);
          // showAlerts("Deleted successfully!", "success")

          window.location.reload(false);
          // console.log(user);
        });
    }
  };
  const UploadFile = (e) => {
    e.preventDefault();
    console.log(file);
    // setFiles(e.target.files[0].name);
    // const file1 = e.target.files[0];
    const form = new FormData();
    form.append('file', file);

    // File parsed by multer from incoming request
    console.log(form);
    setIsLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${id}/upload`,
        form,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain',
            authorization: `Bearer: ${token}`,
          },
        }
      )
      .then((res) => {
        window.location.reload(false);
        setIsLoading(false);

        // setDocument(file)
        console.log(res);
        // let files = res.data.fileUrl
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(e.target.files[0].name)
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  //  useEffect(() => {
  //        axios.get(`https://vctech-phase2.s3.amazonaws.com/api/projects/${id}/get-file`, {headers: {'Access-Control-Allow-Origin' : '*' , 'Content-Type': 'text/plain',   authorization: `Bearer: ${token}` } }).then(res => {
  //        // console.log(headers)
  //        console.log(res.data)
  //          setDocument(res.data.data)

  //        }).catch(err => {
  //          console.log(err)
  //        }
  //        )
  //    }, [id])
  useEffect(() => {
    if (!first) {
      setFirst(true);
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/projects/get-project/${id}`,
          { headers: { authorization: `Bearer: ${token}` } }
        )
        .then((res) => {
          console.log(res.data.data.fileUrl);
          console.log([res.data.data]);
          setProjects(res.data.data);
          if (res.data.data.fileUrl !== undefined)
            setDocument(res.data.data.fileUrl);
          console.log(project);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('useeffect ran');
    }
  }, []);

  console.log(Document);
  console.log(file);

  return (
    <div style={content}>
      <Header />
      <div style={{ display: 'flex' }}>
        {/* ProjectSidebar Component */}
        <ProjectSideBar id={id} toggleState={3} />
        {/* Documents Upload using MUI */}
        <div style={{ width: '100%' }}>
          <div className='container my-3 '>
            <div>
              <h4>Site Documents</h4>
            </div>

            <form onSubmit={(e) => UploadFile(e)}>
              <input type='file' onChange={(e) => handleFile(e)} />
              <div>
                <button style={Documentbtn} type='submit'>
                  Upload Documents
                </button>
              </div>
            </form>

            {console.log(project)}
            {Document.map((item) => {
              return (
                <div>
                  {console.log(item)}

                  <CardsDoc title={item.split('-')[2]} id={id} url={item} />
                </div>
              );
            })}

            {/* {auth.role === "Admin" ? <DeleteOutlineIcon style={myDelete}  onClick={()=>{DeletePost(Document._id)}} /> : <DeleteOutlineIcon style={myDeleteDis}  disabled/> }     */}

            {isLoading ? <LoadingSpinner /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default siteDocuments;
