import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  let navigate = useNavigate()
  
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleChange = (e) => {
    setcredentials({...credentials, [e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation}),
    });

    const newData = await response.json();
    console.log(newData)

    if (!newData.success) {
      alert("Enter valid credentials")
    }
    if (newData.success) {
      navigate('/Login')
    }    
  };

  return (
    <div className="bg-neutral-300 h-[100vh]">
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              value={credentials.name}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              value={credentials.email}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              value={credentials.password}
            />

            <div className="mt-4">
              <input
                type="text"
                name="geolocation"
                placeholder="Address"
                className="w-full px-4 py-2 border rounded"
                onChange={handleChange}
                value={credentials.geolocation}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 mr-4 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
          <Link to="/Login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Already a user
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
