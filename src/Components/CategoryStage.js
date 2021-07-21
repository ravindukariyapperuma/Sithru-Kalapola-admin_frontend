import React, { useState, useEffect } from "react";
import Category from "./Category";

const axios = require("axios");

function CategoryStage() {
    const [categorys, setCategorys] = React.useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/category").then((response) => {
            if (response.data.length > 0) {
                setCategorys(response.data.map((categorys) => categorys));
            }
        });

    },[]);
    return (
        <Category categorys={categorys} />
    )
}

export default CategoryStage
