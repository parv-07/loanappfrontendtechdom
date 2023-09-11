import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import { useState } from 'react';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import UserLoan from './component/UserLoan';
import Admin from './component/admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" Component={SignIn}></Route>
          <Route path="/SignUp" Component={SignUp}></Route>
          <Route path="/userloan/?" Component={UserLoan}></Route>
          <Route path="/Admin" Component={Admin}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
