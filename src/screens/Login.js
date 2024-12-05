import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

const Login = () => {
  let navigate = useNavigate()

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setcredentials({...credentials, [e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password}),
    });

    const newData = await response.json();
    console.log(newData)

    if (!newData.success) {
      alert("Enter valid email or password")
    }

    if (newData.success) {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", newData.authToken)
      navigate('/');
    }
  };



  return (
<div className="bg-neutral-300 h-[100vh]">
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              value={credentials.email}
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              value={credentials.password}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 mr-4 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <Link to="/creatuser">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              New user
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
