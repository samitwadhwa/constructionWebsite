import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import SiteDocuments from './pages/project/SiteDocuments';
import PurchaseReq from './pages/project/PurchaseReq';
import Teams from './pages/teams/Teams';
import Clients from './pages/teams/Clients';
import ChangeRequests from './pages/project/ChangeRequests';
import ClientFeedback from './pages/project/ClientFeedback';
import Home from './pages/home/Home';
import Leave from "./pages/Leave Request/Leave";
import SiteUpdates from './pages/project/siteUpdates';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from 'react-router-dom';
// import Teams from './Components/Tabs/teams';
// import Tabs from './Components/Tabs/tabs';
import Header from './pages/components/header';
// import Teams from './Components/Tabs/teams';
import Projects from './pages/project/Project';
import Project from './pages/project/components/project';
// import Start from './Components/Start/Start';
import ReimbursementReq from './pages/project/ReimbursementReq';
// import Projects from "../src/Components/Tabs/Project"
import Analytics from './pages/analytics/Analytics';
// import Project from "../src/Components/Tabs/projects/project"
import Start from './pages/Start/Start';
// import ReimbursementReq from './Components/Tabs/projects/ReimbursementReq';
import TaskManager from './pages/taskManager/TaskManager';
import Databases from './pages/databases/Databases';
import Checklist from './pages/databases/Checklist';
import Items from './pages/databases/Items';
import QualityChecklist from './pages/project/QualityChecklist';

// import SiteUpd from './Components/Tabs/siteUpd';
// import AddTask from './Components/Tabs/addTask';

ReactDOM.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    {/* <Header/> */}
    <AuthProvider>
      <Router>
        {/* <App/> */}

        <Routes>
          <Route path='/' element={<App />} />
          {/* <Route path="/tabs" element={<Tabs/>} />  */}
          <Route
            exact
            path='/Project'
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/Teams'
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/clients'
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/Add-Task'
            element={
              <ProtectedRoute>
                <TaskManager />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/analytics'
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/leave-request'
            element={
              <ProtectedRoute>
                <Leave />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/databases/quality-checklists'
            element={
              <ProtectedRoute>
                <Databases />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/databases/quality-checklist/:id'
            element={
              <ProtectedRoute>
                <Checklist />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/databases/quality-checklist/checklist/:id'
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id'
            element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id/purchase-req'
            element={
              <ProtectedRoute>
                <PurchaseReq />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id/site-updates'
            element={
              <ProtectedRoute>
                <SiteUpdates />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id/site-documents'
            element={
              <ProtectedRoute>
                <SiteDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id/change-req'
            element={
              <ProtectedRoute>
                <ChangeRequests />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id/reimbursement-req'
            element={
              <ProtectedRoute>
                <ReimbursementReq />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id/client-feedback'
            element={
              <ProtectedRoute>
                <ClientFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/projects/:id/quality-checklist'
            element={
              <ProtectedRoute>
                <QualityChecklist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
