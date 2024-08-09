import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import LocalisedFormat from 'dayjs/plugin/localizedFormat';
// import Teams from "./Teams";
import '../styles/style.css';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import ProjectSideBar from './components/ProjectSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import cr_styles from './styles/ChangeRequests.module.css';

dayjs.extend(LocalisedFormat);

export default function ChangeRequests() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const [changeReq, setChangeReq] = useState([]);

  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const [date, setDate] = useState(new Date());
  const token = localStorage.getItem('token');
  useEffect(() => {
    const today = new Date();
    setDate(today);
  }, []);

  // console.log(env.name)
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/client/get-request/${id}`, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setChangeReq(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <div>
      <div>
        {/* For displaying the sidebars */}
        <Header />
        <div style={{ display: 'flex' }}>
          {/* ProjectSidebar Component */}
          <ProjectSideBar id={id} toggleState={5} />
          <div
            style={{ backgroundColor: '#F1F2F0', width: '100%', flexGrow: 1 }}
          >
            {/*//TODO: Extract this component  */}
            <h3 style={{ padding: '1rem 0 0 3rem' }}>Change requests</h3>
            <div className={cr_styles.gridContainer}>
              {changeReq.map((item) => {
                return (
                  <div key={item._id} className={cr_styles.gridElements}>
                    <div className={cr_styles.heading}>
                      {/*<span>{item._projectID}-CR-{item._changeRequestID}</span>*/}
                      <span>{item.uid}</span>
                      <span>
                        {dayjs(item.createdAt).format('LLL').toString()}
                      </span>
                    </div>
                    <div className={cr_styles.content}>
                      {item.changeRequest}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
