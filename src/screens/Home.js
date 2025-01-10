import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search , setSearch] = useState('')

  const loadData = async () => {
    let response = await fetch("https://gofood-3-8rvz.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-slate-100">
      <div>
        <Navbar />
      </div>
      <div>
        <div className="flex items-center justify-center w-[100%] my-3 px-4">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            className="px-4 py-2 border rounded-xl w-full border-1 border-solid border-black"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
  {foodCat.length > 0 ? (
    foodCat.map((data) => (
      <div key={data._id}>
        <div className="font-bold text-2xl p-2">{data.CategoryName}</div>
        <hr />
        <div className="flex flex-wrap">
        {foodItem.length > 0
          ? foodItem
              .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
              .map((filteredItem) => (
                <div key={filteredItem._id} className="flex">
                 <Card foodItems={filteredItem} options={filteredItem.options} />
                </div>
              ))
          : <div>No data</div>} </div>
      </div>
    ))
  ) : <div>No categories available</div>}
</div>
      <div>
        <Footer />
      </div>
    </div>
  )
};

export default Home;
