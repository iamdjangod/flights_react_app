import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { formatDate, formatDuration } from "../utils/FormatUtils";

export default function FlightInfo(props) {
  return (
    <Accordion sx={{ marginBottom: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ border: "solid grey 1px" }}
      >
        <Grid container spacing={2}>
          <Grid item size={{ xs: 2, md: 1 }}>
            <img
              src={props.logo}
              alt="airline logo"
              style={{ width: 50, height: 50 }}
            ></img>
          </Grid>
          <Grid item size={{ xs: 8, md: 3 }} width={150}>
            <Typography>
              {props.departure} - {props.arrival}
            </Typography>
            <Typography variant="caption">{props.name}</Typography>
          </Grid>
          <Grid
            item
            size={{ xs: 3, md: 4 }}
            sx={{ display: { xs: "none", md: "block" }, textAlign: "center" }}
          >
            <Typography sx={{ width: 400 }}>
              {props.duration}
              <br />
              <Typography variant="caption">{props.route}</Typography>
            </Typography>
          </Grid>
          <Grid
            item
            size={{ xs: 3, md: 2 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography>{props.stops} stops</Typography>
          </Grid>
          <Grid
            item
            size={{ xs: 2, md: 2 }}
            sx={{ offset: "auto", color: "green", textAlign: "right" }}
            offset={{ md: "auto" }}
          >
            {props.price}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 3, md: 1 }}>
            <img
              src={props.logo}
              alt="airline logo"
              style={{ width: 50, height: 50 }}
            ></img>
          </Grid>
          <Grid item size="grow" textAlign={"left"}>
            {props.segments.map((segment) => (
              <div id={segment.id}>
                <Typography>
                  {formatDate(segment.departure)} - {segment.origin.name}
                </Typography>
                <Typography variant="caption">
                  Travel time: {formatDuration(segment.durationInMinutes)}
                </Typography>
                <Typography>
                  {formatDate(segment.arrival)} - {segment.destination.name}
                </Typography>
                <Typography variant="caption">
                  {segment.marketingCarrier.name} - Flight number{" "}
                  {segment.flightNumber}
                </Typography>
                {props.segments.length > 1 && <Box sx={{ height: 20 }}></Box>}
              </div>
            ))}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
