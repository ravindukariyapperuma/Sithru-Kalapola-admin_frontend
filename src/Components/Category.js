import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteStore from "./DeleteStore";
import EditCategory from "./EditCategory"
import DeleteCategory from "./DeleteCategory"

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

function Category(props) {

    const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [maincategory, setMaincategory] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setMaincategory("");
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
        name: name,
        maincategory: maincategory,
        description: description,
      };

    await axios.post("http://localhost:5000/category", data).then((res) => {
      console.log("res", res);
      setName("");
    setDescription("");
    setMaincategory("");
    });
    setOpen(false);
    window.location.reload();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


    return (
        <div>
            <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add New Category
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth="100%"
      >
        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          <form>
            <InputLabel
              className={classes.label}
              id="demo-simple-select-filled-label"
            >
              Category Name
            </InputLabel>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="enter category name here"
              type="text"
              fullWidth
              required
            />

            <InputLabel
              className={classes.label}
              id="demo-simple-select-filled-label"
            >
              Category Description
            </InputLabel>
            <TextField
              variant="outlined"
              margin="dense"
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="enter category description here"
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <br />
      <br />

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Maincategory</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.categorys.map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.maincategory}</TableCell>
                    <TableCell align="right">
                      <EditCategory
                        id={row._id}
                        name={row.name}
                        description={row.description}
                        maincategory={row.maincategory}
                      />
                      
                      <DeleteCategory id={row._id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 50]}
          component="div"
          count={props.categorys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
        </div>
    )
}

export default Category
