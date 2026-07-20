import { createBrowserRouter } from 'react-router-dom';

import NavbarLayout from '../components/NavbarLayout.jsx';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import Doctors from '../pages/Doctors';
import Appointments from '../pages/Appointments';
import MedicalRecords from '../pages/MedicalRecords';
import About from '../pages/About';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <NavbarLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'patients', element: <Patients /> },
      { path: 'doctors', element: <Doctors /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'records', element: <MedicalRecords /> },
      { path: 'about', element: <About /> },
    ],
  },
]);