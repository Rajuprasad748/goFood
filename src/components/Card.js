import React, { useState, useRef, useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let data = useCart();
  let options = props.options[0];
  let priceOptions = Object.keys(options);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        })
        return
      }
      else if(food.size !== size){
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return
      }
      return
    }
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  let finalPrice = qty * parseInt(options[size]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-7 py-14 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full ">
            <div className="block relative h-56 w-80 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover w-full h-full block"
                src={props.foodItems.img}
              />
            </div>
            <div className="mt-4 w-40">
              <h2 className="text-gray-900 title-font text-lg font-bold ">
                {props.foodItems.name}
              </h2>
              <div className="flex my-2 gap-4 w-60 font-semibold ">
                <select
                  onChange={(e) => setQty(e.target.value)}
                  className="py-1 px-2 bg-green-500 rounded-lg text-black"
                >
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {" "}
                        {i + 1}{" "}
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={(e) => setSize(e.target.value)}
                  ref={priceRef}
                  className="bg-green-500 text-black rounded-lg py-1 px-3"
                >
                  {priceOptions.map((data) => {
                    return (
                      <option key={data} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>
              <p className="my-1 px-2 font-extrabold"> ₹ {finalPrice}/- </p>
            </div>
            <hr />
            <div
              onClick={handleAddCart}
              className="bg-green-500 w-40 flex items-center justify-center px-6 py-2 active:scale-95 text-black rounded-md cursor-pointer"
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
