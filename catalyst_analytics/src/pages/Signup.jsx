import React, { useState  ,useContext} from "react";
import axios from "axios";
import { GlobalContext } from "../Context/Context";
import img1 from '../assets/Rectangle 19280.png'
import img2 from '../assets/image 939.png'
import img3 from '../assets/image 940.png'

// import { Link } from "react-router";


const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
 let { state} = useContext(GlobalContext);

  // const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${state.baseUrl}/signup`,
        formData ,{withCredentials: true,}
      );
console.log(response.data.user)
alert("Signup successful!")
      // setMessage(response.data.message || "Signup successful!");

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.log("SomeThing Wrong")
    }
  };

  return (
 <div className="h-[700px] w-full  max-w-[1400px]  border ml-10 my-[50px]  border-2 flex justify-center items-center  ">
      <div className="w-[1400px] h-[700px] ml-[-40px]">
  <img
    src={img1}
    alt=""
    className="w-full h-full object-contain"
  />
  </div>
      <div className="w-full p-10">
  <div className="flex flex-col items-start">

        <h1 className="text-[66.6px] leading-[100%] font-bold text-[#000000]">
          FASCO
        </h1>

        <p className="text-[#000000] text-[30px] mt-20 mb-6">
        Create Account
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
        {/* {message && (
          <div className="mb-4 bg-gray-100 p-3 rounded-lg text-center text-sm">
            {message}
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
className="w-full border-b border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border-b border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
<div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
</div>
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
            className="w-full bg-[#000000]  text-white font-semibold py-3 rounded-lg transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Signup;