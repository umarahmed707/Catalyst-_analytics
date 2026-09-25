import React, { useContext, useState } from 'react';

import axios from "axios";

import img1 from '../assets/Rectangle 19280.png'
import img2 from '../assets/image 939.png'
import img3 from '../assets/image 940.png'
import { GlobalContext } from "../Context/Context";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


 let { state, dispatch } = useContext(GlobalContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${state.baseUrl}/login`,
        formData,{withCredentials: true,}
      );

      dispatch({type :"USER_LOGIN" , user :response.data.user})

      // console.log("RESPONSE:", response.data);
      console.log("Logged in user:", response.data);


  alert("Login successful!")


    } catch (error) {
      
        alert("Invalid email or password")
      
    }
  };

  return (
  <div className="h-[700px] w-full  max-w-[1400px]  border ml-10 my-[50px] border-2 flex justify-center items-center  ">
      <div className="w-[1400px] h-[700px]">
  <img
    src={img1}
    alt=""
    className="w-full h-full object-contain"
  />
</div>
      <div className="w-full   p-20">
        <div className="flex flex-col items-start">

        <h1 className="text-[66.6px] leading-[100%] font-bold text-[#000000]">
          FASCO
        </h1>

        <p className="text-[#000000] text-[30px] mt-2 mb-6">
        Sign In To FASCO
        </p>
        </div>

       

<div className="flex gap-10 py-5">
  <div className="w-[294px] h-[55px] flex gap-5 justify-center items-center  border border-2 rounded-[10px] ">
  <img src={img2} alt="" sizes={36} />
  <p className="text-[16px] leading-[40%] tracking-[8%]">Sign up with Google</p>
  </div>

    <div className="w-[294px] h-[55px] flex gap-5 justify-center items-center border border-2 rounded-[10px] ">
  <img src={img3} alt="" sizes={36}/>
  <p className="text-[16px] leading-[40%] tracking-[8%]">Sign up with Google</p>
  </div>
  </div>
  <p className="text-[30px]">- OR -</p>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full  border-b border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
            required
          />

          <input
            type="password"
            name="password" 
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#000000] text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>
<div className="flex justify-end">
  <button className="text-blue-500 hover:underline cursor-pointer">
    Forget Password
  </button>
</div>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;