import React, { useState, useEffect } from "react";
import Orders from "./Orders";

const axios = require("axios");

function OrdersStage() {
    const [cart, setCart] = React.useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/cart").then((response) => {
            if (response.data.length > 0) {
                setCart(response.data.map((cart) => cart));
            }
        });
    },[]);
    return (
        <Orders cart={cart} />
    )
}

export default OrdersStage
