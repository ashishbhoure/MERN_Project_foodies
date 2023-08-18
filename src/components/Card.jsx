import React, { useState } from "react";
import { useCart, useDispatchCart } from "./ContextReduser";

function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const [qty, setQty] = useState(1);
  let finalPrice = qty * props.foodItems.price;
  const handleToCart = async () => {
    let food = [];
    debugger;
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }
    // console.log(food);
    if (food !== []) {
      // console.log("enter");
      if (food.id === props.foodItems._id) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
        });
        return;
      }
    }
    // await dispatch({
    //   type: "ADD",
    //   id: props.foodItems._id,
    //   name: props.foodItems.name,
    //   price: finalPrice,
    //   qty: qty,
    // });
    // console.log(data);
  };

  return (
    <div
      className="card card-box m-3"
      style={{ width: "18rem", objectFit: "fill", height: "450px" }}
    >
      <img
        src={props.foodItems.img}
        style={{ width: "100%", height: "180px", contain: "fit" }}
        className="card-img-top"
        alt={props.foodItems.name}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItems.name}</h5>
        <p className="card-text">{props.foodItems.description}</p>
      </div>
      <div className="container d-flex justify-content-between mb-3 w-100">
        <select
          className="h-100 bg-info"
          onChange={(e) => setQty(e.target.value)}
        >
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={1 + i} value={1 + i}>
                {1 + i}
              </option>
            );
          })}
        </select>
        <div className="h-100 fs-5">₹{finalPrice} /-</div>
      </div>
      {/* <hr /> */}
      {/* <hr /> */}
      <button
        className="btn bg-white fw-bolder justify-content-center text-info mx-2 mb-3"
        onClick={handleToCart}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default Card;
