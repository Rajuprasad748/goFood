import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="text-xl font-semibold">The Cart is Empty</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orederData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    })

    if (response?.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div className="overflow-x-auto px-4">
      <table className="min-w-full bg-white border border-gray-200 text-black font-semibold">
        <thead className="bg-gray-300">
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              {" "}
              #{" "}
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              {" "}
              Name{" "}
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              {" "}
              Quantity{" "}
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              {" "}
              Option{" "}
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              {" "}
              Amount{" "}
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {data.map((food, index) => {
            return (
              <React.Fragment key={index}>
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className="p-2 font-bold">{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div>
        <h1 className="text-2xl font-bold mt-4">Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button
          onClick={handleCheckOut}
          className="bg-red-500 text-white font-semibold px-4 py-1 my-4"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
