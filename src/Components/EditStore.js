import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(0),
      },
    },
    input: {
      display: "none",
    },
    button: {
      margin: theme.spacing(1),
    },
    formControl: {
      // margin: theme.spacing(1),
      // minWidth: 120,
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      marginTop: theme.spacing(1),
    },
    label1: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

function EditStore(props) {
    const classes = useStyles();

    const [categorys, setCategorys] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    
  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [maincategory, setMaincategory] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");
  const [image, setImage] = React.useState(null);

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

    setId(props.id);
    setName(props.name);
    setDescription(props.description);
    setPrice(props.price);
    setMaincategory(props.maincategory);
    setSubcategory(props.subcategory);
    setImage(props.image);
    //   setOpen(true);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log(name);

  const handleClose = () => {
      setOpen(false);
  };

  const OnChangeImage = (e) => {
    console.log(e.target.files, "$$$$");

    let file = e.target.files[0];

    setImage(file);

    // this.setState({
    //   image: file,
    // });
  };

  const handleSubmit = async (event) => {
    let formdataupdate = new FormData();
    formdataupdate.set("name", name);
    formdataupdate.set("description", description);
    formdataupdate.set("price", price);
    formdataupdate.set("maincategory", maincategory);
    formdataupdate.set("subcategory", subcategory);
    formdataupdate.set("image", image);

    axios
      .patch("http://localhost:5000/product/" + id, formdataupdate)
      .then((res) => {
        console.log("res", res);
        setOpen(false);
        window.location.reload();
      });
  }

    

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="update">
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth="100%"
      >
        <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
        <DialogContent>
          <form>
            <InputLabel
              className={classes.label}
              id="demo-simple-select-filled-label"
            >
              Product Name
            </InputLabel>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="enter product name here"
              type="text"
              fullWidth
              required
            />

            <InputLabel
              className={classes.label}
              id="demo-simple-select-filled-label"
            >
              Product Description
            </InputLabel>
            <TextField
              variant="outlined"
              margin="dense"
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="enter product description here"
              type="text"
              fullWidth
              required
            />

            <InputLabel
              className={classes.label}
              id="demo-simple-select-filled-label"
            >
              Product Price
            </InputLabel>
            <TextField
              variant="outlined"
              margin="dense"
              name="price"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="enter product price here"
              type="text"
              fullWidth
              required
            />

            <InputLabel
              className={classes.label1}
              id="demo-simple-select-filled-label"
            >
              Main Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={maincategory}
              onChange={(e) => setMaincategory(e.target.value)}
              variant="outlined"
              margin="dense"
              fullWidth
              required
            >
              <MenuItem value="Oil painting">Oil painting</MenuItem>
              <MenuItem value="Watercolor painting">
                Watercolor painting
              </MenuItem>
              <MenuItem value="Pastel painting">Pastel painting</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>

            <InputLabel
              className={classes.label1}
              id="demo-simple-select-filled-label"
            >
              Sub Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              // label="Price"
              id="demo-simple-select"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              variant="outlined"
              margin="dense"
              fullWidth
              required
            >
              {categorys
                .filter((categorys) => categorys.maincategory === maincategory)
                .map(function (categorys) {
                  return (
                    <MenuItem value={categorys.name}>{categorys.name}</MenuItem>
                  );
                })}
            </Select>

            <InputLabel
              className={classes.label1}
              id="demo-simple-select-filled-label"
            >
              Image
            </InputLabel>
            <input
              accept="image/*"
              onChange={(e) => OnChangeImage(e)}
              // value={image}
              id="contained-button-file"
              type="file"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditStore;
