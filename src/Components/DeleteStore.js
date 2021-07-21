import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const axios = require("axios");

function DeleteStore(props) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(props.id);
  }, []);

  const handledelete = async () => {
    await axios
      .delete("http://localhost:5000/product/" + id)
      .then((res) => console.log(res.data));
    window.location.reload();
  };

  return (
    <IconButton
      onClick={() => {
        handledelete();
      }}
      aria-label="delete"
    >
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteStore;
