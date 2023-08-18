import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReduser";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <h2 className="text-center w-100 m-5">The Cart Is Empty !</h2>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("responce of order : ", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
        <table class="table table-hover">
          <thead className="text-info fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn px-3 btn-danger"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="fw-bold fs-5">Total Price : ₹ {totalPrice} /-</div>
        <div>
          <button className="btn btn-info mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
