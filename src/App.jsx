import { find } from "lodash";
import React from "react";
import { useState,useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
const baseUrl = process.env.REACT_APP_API_BASE_URL;



export default function App() {
  const [size,setSize] = useState();
  const {data : products ,Errors,Loading} = useFetch("products?category=shoes");
  
  
  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }
  const filteredproducts = size ? products.filter((p)=>p.skus.find((s)=>s.size === parseInt(size))):products;
  if(Errors)
  {
    throw Errors;
  }
  if(Loading) return <Spinner/>;
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e)=>setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          {size && <h2>{filteredproducts.length} Products are found</h2>}
          <section id ="products">
            {filteredproducts.map(renderProduct)}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
