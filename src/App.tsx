import React from 'react';
import './App.css';
import Layout from './Components/Layout';
import Layout2 from './Components/Layout/Matrial'
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import SchoolCreate from './Pages/SchoolCreate';
import SchoolEdit from './Pages/SchoolEdit';
import SchoolView from './Pages/SchoolView';
import Login from './Pages/Login';
import Protected from './Components/Protected';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Protected>
            <Layout2 />
          </Protected>
        }>
          <Route path='/' index element={<Dashboard title="Dashboard" content="Dashboard"/>} />
          <Route path="/create-school" element={<SchoolCreate title="School Create" content="create school"/>}/>
          <Route path="/edit-school" element={<SchoolEdit title="School Edit" content="edit school"/>}/>
          <Route path='/view-school/:id' element={<SchoolView title="School View" content="view school"/>}/>
        </Route>
          <Route path='/login' element={<Login title="SportyLife Login" content="Login"/>}/>
        <Route path="*" element={<Navigate to="/login" />}/>
      </Routes>
    </>
  );
}

export default App;
