import React from 'react';
import './App.css';
import Layout from './Components/Layout';
import Layout2 from './Components/Layout/Layout'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';


// page routes
import Dashboard from './Pages/Dashboard';
import SchoolCreate from './Pages/SchoolCreate';
import SchoolEdit from './Pages/SchoolEdit';
import SchoolView from './Pages/SchoolView';
import Login from './Pages/Login';
import CreateEmp from './Pages/CreateEmp';
import CreateCourse from './Pages/LMS';
import Settings from './Pages/Settings';
import Support from './Pages/Support';
import Users from './Pages/Users';
import Package from './Pages/Package';

import Profile from './Components/UserView/Profile';

// academy
import Academy from './Pages/Academy/Academy';
import Coach from './Pages/Academy/Coach';

// blog routes
import NewBlog from './Pages/Blog'

// public routes
import Protected from './Components/Protected';
import Permission from './Pages/Permission';
import NotAllowed from './Pages/NotAllowed';


// nested routes
import Chapter from './Components/LMS/MenuContainer/Chapter';
import Choice from './Components/LMS/MenuContainer/Choice';
import Checklist from './Components/LMS/MenuContainer/Checklist';
import Feedback from './Components/LMS/MenuContainer/Feedback';
import Quiz from './Components/LMS/MenuContainer/Quiz';
import Lesson from './Components/LMS/MenuContainer/Lesson';

// blog
import New from './Components/Blog/New';
import EditBlog from './Components/Blog/EditBlog';
import Statics from './Components/Blog/Statics';
import EditBanner from './Components/Blog/EditBanner';
import UploadBanner from './Components/Blog/UploadBanner';

import Blog from './Components/Blog/Type/Blog'
import Tutorial from './Components/Blog/Type/Tutorial';



function App() {

  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  return (
    <>
      <Routes>
        {/* school protection routes */}
        <Route path='/' element={<Layout2 />}>


          {/* protected routes */}
          <Route element={<Protected allowdRole={[99]} />}>
            <Route path='/' index element={<Dashboard title="Dashboard" content="Dashboard" />} />
            <Route path='/settings' element={<Settings title="Settings" content="Settings" />} />
            <Route path='/support' element={<Support title="Supports" content="Support" />} />
          </Route>
          <Route element={<Protected allowdRole={[99, 1012]} />}>
            <Route path="/create-school" element={<SchoolCreate title="School Create" content="create school" />} />
          </Route>
          <Route element={<Protected allowdRole={[99, 1011]} />}>
            <Route path="/edit-school" element={<SchoolEdit title="School Edit" content="edit school" />} />
            <Route path='/view-school/:id' element={<SchoolView title="School View" content="view school" />} />
          </Route>
          <Route element={<Protected allowdRole={[901, 902, 903]} />}>
            <Route path="/create-emp" element={<CreateEmp title="Create Emp" content="Create Employe" />} />
            <Route path="/emp-permission" element={<Permission title="Permission" content="Permission" />} />
          </Route>


          {/* academy  */}
          <Route element={<Protected allowdRole={[99, 1011, 1012, 901, 902, 903]} />}>
            <Route path='/create-academy' element={<Academy title="Create Course" content="course" />} />
            <Route path='/create-coach' element={<Coach title="Create Coach" content="coach" />} />
          </Route>

          {/* package  */}
          <Route element={<Protected allowdRole={[99, 1011, 1012, 901, 902, 903]} />}>
            <Route path="/new-create-package" element={<Package title="Pacakge" content="Pacakge" />} />
          </Route>

          {/* Users */}
          <Route element={<Protected allowdRole={[99, 1011, 1012, 901, 902, 903]} />}>
            <Route path='/users' element={<Users title="Users" content="Users" />} />
            <Route path="user/:id" element={<Profile />} />
          </Route>

          {/* LMS */}
          <Route element={<Protected allowdRole={[99, 1011, 1012, 901, 902, 903]} />}>
            <Route path='new-course-enroll' element={<CreateCourse title="Create Course" content="course" />}>
              <Route path='chapter' index element={<Chapter />} />
              <Route path='choice' element={<Choice />} />
              <Route path='checklist' element={<Checklist />} />
              <Route path='feedback' element={<Feedback />} />
              <Route path='quiz' element={<Quiz />} />
              <Route path='lesson' element={<Lesson />} />
            </Route>
          </Route>

          {/* Blog */}
          <Route element={<Protected allowdRole={[99, 1011, 1012, 901, 902, 903]} />}>
            <Route path='blog' element={<NewBlog title="Blog" content="blog" />}>
              <Route path='new' element={<New />} />
              <Route path='new/blog' element={<Blog />} />
              <Route path='new/tutorial' element={<Tutorial />} />
              <Route path='edit-blog' element={<EditBlog />} />
              <Route path='upload-banner' element={<UploadBanner />} />
              <Route path='edit-banner' element={<EditBanner />} />
              <Route path='statics' element={<Statics />} />
            </Route>
          </Route>

          {/* unathorized page */}
        </Route>
        {/* end of school routes */}

        <Route path='/login' element={<Login title="SportyLife Login" content="Login" />} />
        {/* false route will redirect to login page */}
        <Route path="*" element={<Navigate to="/login" />} />
        {/* <Route path='/not-allowed' element={<NotAllowed />} /> */}
      </Routes>
    </>
  );
}

export default App;
