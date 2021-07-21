import React, { useState, useEffect } from "react";
import Store from "./Store";
const axios = require("axios");

function StoreStage() {

    const [categorys, setCategorys] = React.useState([]);
    const [products, setProducts] = React.useState([]);

    

    useEffect(() => {
        axios.get("http://localhost:5000/category").then((response) => {
            if (response.data.length > 0) {
                setCategorys(response.data.map((categorys) => categorys));
            }
            console.log(categorys);
        });

        axios.get("http://localhost:5000/product").then((response) => {
            if (response.data.length > 0) {
                setProducts(response.data);
            }
        });
        console.log(categorys)

    },[]);
    return (
        <Store products={products} categorys={categorys} />
    )
}

export default StoreStage
