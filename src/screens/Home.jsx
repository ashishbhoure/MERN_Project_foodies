import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let responce = await fetch("http://localhost:5000/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    responce = await responce.json();
    // console.log(responce[0], responce[1]);

    setFoodItem(responce[0]);
    setFoodCat(responce[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className=" d-flex justify-content-center " role="search">
                <input
                  className="search-bar form-control me-2"
                  type="search"
                  value={search}
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300?burger"
                className="cImg d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300?momos"
                className="cImg d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300?pizza"
                className="cImg d-block"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div key={data._id} className="row">
                  <div className="fs-3 m-2 mt-5 fw-500 text-info">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItem) => {
                        return (
                          <div
                            key={filterItem._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodItems={filterItem}
                              // name={filterItem.name}
                              // price={filterItem.price}
                              // img={filterItem.img}
                              // description={filterItem.description}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>

      <Footer />
    </>
  );
}

export default Home;
