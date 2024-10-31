import React, { useState } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";

export default function SelectPassenger({ setParentAdults, setParentChildren, setParentInfants }) {
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [total, setTotal] = useState(adults + children + infants);
  const [validTotal, setValidTotal] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = (event) => {
    if (!validTotal) cancel();
    else {
      setTotal(adults + children + infants);
      setParentAdults(adults);
      setParentChildren(children);
      setParentInfants(infants);
    }
    setAnchor(event.currentTarget);
    setOpen(!open);
  };

  const handleAddAdult = () => {
    setAdults(adults + 1);
    validatePassengers();
  };

  const handleRemoveAdult = () => {
    setAdults(adults - 1);
    validatePassengers();
  };

  const handleAddChildren = () => {
    setChildren(children + 1);
    validatePassengers();
  };

  const handleRemoveChildren = () => {
    setChildren(children - 1);
    validatePassengers();
  };

  const handleAddInfants = () => {
    setInfants(infants + 1);
    validatePassengers();
  };

  const handleRemoveInfants = () => {
    setInfants(infants - 1);
    validatePassengers();
  };

  const validatePassengers = () => {
    setTotal(adults + children + infants);
    if (total > 9) {
      setValidTotal(false);
      setErrorMsg("We don't support more than 9 passengers");
    } else {
      setValidTotal(true);
    }

    if (infants > adults * 2) {
      setValidTotal(false);
      setErrorMsg("At least one adult per 2 infants");
    }
  };

  const handleDone = () => {
    setParentAdults(adults);
    setParentChildren(children);
    setParentInfants(infants);
    setTotal(adults + children + infants);
    setOpen(!open);
  };

  const handleCancel = () => {
    setOpen(!open);
    cancel();
  };

  const cancel = () => {
    setAdults(1);
    setChildren(0);
    setInfants(0);
    setTotal(1);
    setValidTotal(true);
  };

  return (
    <Box>
      <Popper
        sx={{ zIndex: 1200 }}
        open={open}
        anchor={anchor}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ width: 260 }}>
              <Grid container spacing={1}>
                <Grid item size={6}>
                  <Typography sx={{ p: 2 }}>Adults</Typography>
                </Grid>
                <Grid item size={6} sx={{ p: 1 }}>
                  <IconButton
                    disabled={adults === 1}
                    onClick={handleRemoveAdult}
                  >
                    <RemoveCircleIcon></RemoveCircleIcon>
                  </IconButton>
                  {adults}
                  <IconButton disabled={adults === 9} onClick={handleAddAdult}>
                    <AddCircleIcon></AddCircleIcon>
                  </IconButton>
                </Grid>
                <Grid item size={6}>
                  <Typography sx={{ p: 2 }}>Children</Typography>
                </Grid>
                <Grid item size={6} sx={{ p: 1 }}>
                  <IconButton
                    disabled={children === 0}
                    onClick={handleRemoveChildren}
                  >
                    <RemoveCircleIcon></RemoveCircleIcon>
                  </IconButton>
                  {children}
                  <IconButton
                    disabled={children === 9}
                    onClick={handleAddChildren}
                  >
                    <AddCircleIcon></AddCircleIcon>
                  </IconButton>
                </Grid>
                <Grid item size={6}>
                  <Typography sx={{ p: 2 }}>Infants </Typography>
                </Grid>
                <Grid item size={6} sx={{ p: 1 }}>
                  <IconButton
                    disabled={infants === 0}
                    onClick={handleRemoveInfants}
                  >
                    <RemoveCircleIcon></RemoveCircleIcon>
                  </IconButton>
                  {infants}
                  <IconButton
                    disabled={infants === 9}
                    onClick={handleAddInfants}
                  >
                    <AddCircleIcon></AddCircleIcon>
                  </IconButton>
                </Grid>
                {validTotal ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Button variant="text" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="text" onClick={handleDone}>
                      Done
                    </Button>
                  </Box>
                ) : (
                  <Typography sx={{ p: 2, color: "red" }}>
                    {errorMsg}
                  </Typography>
                )}
              </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Button variant="text" onClick={handleClick}>
        <PersonIcon></PersonIcon> {total}
      </Button>
    </Box>
  );
}
