
// import React from "react";
// import { GlobalContext } from "./Context/Context";
// import {useContext , useEffect } from 'react'
// import { Route,  Routes ,Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from './pages/Home'
// import axios from "axios";




// function App() {
//   let {state , dispatch}= useContext(GlobalContext)

// //   const Checkout = async () => {
// //   try {
// //     const apires = await axios.get(
// //       `${state.baseUrl}me`,
// //       {
// //         withCredentials: true,
// //       }
// //     );

// //     console.log("apires:", apires.data);

// //     dispatch({
// //       type: "USER_LOGIN",
// //       user: apires.data.user,
// //     });

// //   } catch (error) {
// //     console.log("error:", error);

// //     dispatch({
// //       type: "USER_LOGOUT",
// //     });
// //   }
// // };
// const Checkout = async () => {
//   try {
//     console.log("Calling /me...");
//     console.log("Base URL:", state.baseUrl);

//     const apires = await axios.get(
//       `${state.baseUrl}/me`,
//       {
//         withCredentials: true,
//       }
//     );

//     console.log("ME RESPONSE:", apires.data);

//     dispatch({
//       type: "USER_LOGIN",
//       user: apires.data.user,
//     });

//   } catch (error) {
//     console.log("ME ERROR:", error.response?.data || error.message);

//     dispatch({
//       type: "USER_LOGOUT",
//     });
//   }
// };

// useEffect(() => {
//   Checkout();
// }, []);
//   return (
//  <>
//  {state.islogin ?
 
// <Routes>
//   <Route path="/" element={<Home/>}/>
//   <Route path="*" element={<Navigate to="/" />}/>
// </Routes>
// :
 
// <Routes>
//   <Route path="/login" element={<Login/>}/>
//   <Route path="/signup" element={<Signup/>}/>
//   <Route path="*" element={<Navigate to="/login" />}/>
// </Routes>

// // :
// // <div className="flex flex-col justify-center items-center mt-[100px]">
// //   <div className="loading"></div>
// // <p>Loading...</p>
  
// // </div>
// }
//  </>
//   );
// }

// export default App;




import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Routes, Route, Navigate} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { GlobalContext } from './Context/Context';
import Home from './pages/Home';
import axios from 'axios';

function App() {
  let { state, dispatch } = useContext(GlobalContext);
  // console.log("state", state)
  const checkUser = async () => {
    try {
      const apiRes = await axios.get(`${state.baseUrl}me`, { withCredentials: true })
      // console.log("apiRes", apiRes.data)
      dispatch({ type: "USER_LOGIN", user: apiRes.data.user })
    } catch (error) {
      dispatch({ type: "USER_LOGOUT" })
      // console.log("Err", error)
    }
  }

  useEffect(() => {
    checkUser()
  },[])

  return (
    <div className="App">

      {state.isLogin ? (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* <Route path="/about" element={<About />} />
    <Route path="/service" element={<Service />} />
    <Route path="/contact" element={<Contact />} /> */}

    <Route
      path="*"
      element={<Navigate to="/" replace />}
    />
  </Routes>
) : (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route
      path="*"
      element={<Navigate to="/login" replace />}
    />
  </Routes>
)}
    </div>
  );
}

export default App;
