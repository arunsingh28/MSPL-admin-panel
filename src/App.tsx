import React from 'react';
import './App.css';
import Layout from './Components/Layout';
import Layout2 from './Components/Layout/Layout'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import NotAvailable from './Components/NotAvailable';

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
import ListPackage from './Pages/ListPackage';

// nutriotion page
import Ingridienents from './Pages/Nutrition/Ingridienents';
import RecipiesCategories from './Pages/Nutrition/RecipiesCategories';
import MealFrequency from './Pages/Nutrition/MealFrequency';
import Recipies from './Pages/Nutrition/Recipies';
import AddRecipie from './Pages/Nutrition/AddRecipie'
import ViewIngridienents from './Pages/Nutrition/ViewIngridienents'
import EditRecipie from './Pages/Nutrition/EditRecipie';
import DietPlanner from './Pages/Nutrition/DietPlanner';
import MyClient from './Pages/Nutrition/MyClient';
import MyClientTask from './Pages/Nutrition/MyClientLayout';

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
import Lesson from './Components/LMS/temp-lms/Lesson';
import File from './Components/LMS/temp-lms/File';

// blog
import New from './Components/Blog/New';
import EditBlog from './Components/Blog/EditBlog';
import Statics from './Components/Blog/Statics';
import EditBanner from './Components/Blog/EditBanner';
import UploadBanner from './Components/Blog/UploadBanner';

import Blog from './Components/Blog/Type/Blog'
import Tutorial from './Components/Blog/Type/Tutorial';


// LMS
import Modules from './Components/LMS/temp-lms/Modules';
import ViewModules from './Components/LMS/temp-lms/ViewModules';
import EditModule from './Components/LMS/temp-lms/EditCourse'


// mobile
import Banner from './Pages/Mobile/Banner';

function App() {


  const Roles = {
    'superAdmin': [99, 91, 92, 921, 922, 923, 924, 925, 926, 93, 931, 932, 94, 941, 942, 95, 951, 952, 96, 97, 971, 972, 98, 981, 982, 983, 90, 901, 81, 811, 812, 813, 814, 815]
  }


  return (
    <>
      <Routes>
        {/* public route */}

        <Route path='/login' element={<Login title="SportyLife Login" content="Login" />} />
        {/* false route will redirect to login page */}
        <Route path="*" element={<Navigate to="/login" />} />

        <Route path='/' element={<Layout2 />}>
          {/* <Route element={<PresistLogin />}> */}
          {/* protected routes */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path='/' index element={<Dashboard title="Dashboard" content="Dashboard" />} />
            <Route path='/settings' element={<Settings title="Settings" content="Settings" />} />
            <Route path='/support' element={<Support title="Supports" content="Support" />} />
          </Route>
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path="/create-school" element={<SchoolCreate title="School Create" content="create school" />} />
          </Route>
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path="/mobile-banner" element={<Banner title="Mobile Banner" content="Mobile Banner" />} />
          </Route>


          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path="/edit-school" element={<SchoolEdit title="School Edit" content="edit school" />} />
            <Route path='/view-school/:id' element={<SchoolView title="School View" content="view school" />} />
          </Route>
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path="/create-emp" element={<CreateEmp title="Create Emp" content="Create Employe" />} />
            <Route path="/emp-permission" element={<Permission title="Permission" content="Permission" />} />
          </Route>


          {/* academy  */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path='/create-academy' element={<Academy title="Create Course" content="course" />} />
            <Route path='/create-coach' element={<Coach title="Create Coach" content="coach" />} />
          </Route>

          {/* package  */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path="/new-create-package" element={<Package title="Pacakge" content="Pacakge" />} />
            <Route path="/list-package" element={<ListPackage title="List Package" content="List Pacakge" />} />
          </Route>

          {/* Users */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path='/users' element={<Users title="Users" content="Users" />} />
            <Route path="user/:id" element={<Profile />} />
          </Route>

          {/* myClient */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path="/my-client" element={<MyClient title="Clients" content="My client" />} />
            <Route path="/my-client/:id" element={<MyClientTask />}>
              {/* child router */}
              <Route path="progress-tracker" element={<NotAvailable from="Progress Tracker" />} />
              <Route path="meal-planner" index element={<DietPlanner title="Diet Planner" content="Planner" />} />
              <Route path="notes" element={<NotAvailable from="Notes" />} />
              <Route path="assisment-form" element={<NotAvailable from="Assisment From" />} />
            </Route>
          </Route>

          {/* LMS */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path='/view-course' index element={<ViewModules title="view" content="view" />} />
            <Route path='/lms/:id' index element={<EditModule title="Edit" content="Edit" />} />

            <Route path='new-course-enroll' element={<CreateCourse title="Create Course" content="course" />}>
              <Route path='modules/:id' index element={<Modules title="Module" content="Module" />} />
              <Route path='chapter/:id' element={<Chapter />} />
              <Route path='file/:id' element={<File />} />
              <Route path='choice' element={<Choice />} />
              <Route path='checklist' element={<Checklist />} />
              <Route path='feedback' element={<Feedback />} />
              <Route path='quiz' element={<Quiz />} />
              <Route path='lesson/:id' element={<Lesson />} />
            </Route>
          </Route>

          {/* Blog */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
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



          {/* Nutrition */}
          <Route element={<Protected allowdRole={Roles.superAdmin} />}>
            <Route path='/add-ingridienents' element={<Ingridienents title="Ingridienents" content="Ingridienents" />} />
            <Route path='/recipie-categoies' element={<RecipiesCategories title="Recipies" content="Recipies" />} />
            <Route path='/meal-frequency' element={<MealFrequency title="Meal Frequency" content="Meal Frequency" />} />
            <Route path='/create-new-recipie' element={<Recipies title="New Recipies" content="Meal Recipies" />} />
            <Route path='/add-new-recipie' element={<AddRecipie title="Add new recipies" content="Recipies" />} />
            <Route path='/view-ingridienents' element={<ViewIngridienents title="All ViewIngridienents" content="ViewIngridienents" />} />
            <Route path='/edit-recipe/:id' element={<EditRecipie title="Edit Recipie" content="Edit Recipie" />} />
          </Route>
          {/* unathorized page */}
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
