import { AppBar, Box, CircularProgress, Toolbar, Typography } from "@mui/material";
import FlightInfo from "../components/FlightInfo";
import SearchPanel from "../components/SearchPanel";
import { useState } from "react";
import { formatDate } from "../utils/FormatUtils";
import FlightIcon from '@mui/icons-material/Flight';

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [searching, setSearching] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <FlightIcon fontSize={"12"}/> Djangod Flights
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          maxWidth: "100vh",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 3,
        }}
      >
        <SearchPanel
          setFlightsSearchResult={(data) => setFlights(data)}
          setSearchingHome={(data) => setSearching(data)}
        ></SearchPanel>

        {searching && <CircularProgress sx={{p: 3}}/>}

        {flights.length > 0 && (
          <Typography variant="h4" sx={{ m: 2 }}>
            Departure Flights
          </Typography>
        )}

        {flights.map((flight, index) => (
          <FlightInfo
            id={index}
            logo={flight.legs[0].carriers.marketing[0].logoUrl}
            departure={formatDate(flight.legs[0].departure)}
            arrival={formatDate(flight.legs[0].arrival)}
            name={flight.legs[0].carriers.marketing[0].name}
            duration={
              Math.floor(flight.legs[0].durationInMinutes / 60) +
              " hr " +
              (flight.legs[0].durationInMinutes % 60) +
              " min "
            }
            route={
              flight.legs[0].origin.displayCode +
              " - " +
              flight.legs[0].destination.displayCode
            }
            stops={flight.legs[0].stopCount}
            price={flight.price.formatted}
            segments={flight.legs[0].segments}
          ></FlightInfo>
        ))}

        <Box height={20}></Box>

        {flights.length > 0 && (
          <Typography variant="h4" sx={{ m: 2 }}>
            Arrival Flights
          </Typography>
        )}
        {flights.map((flight, index) => (
          <FlightInfo
            id={index}
            logo={flight.legs[1].carriers.marketing[0].logoUrl}
            departure={formatDate(flight.legs[1].departure)}
            arrival={formatDate(flight.legs[1].arrival)}
            name={flight.legs[0].carriers.marketing[0].name}
            duration={
              Math.floor(flight.legs[1].durationInMinutes / 60) +
              " hr " +
              (flight.legs[1].durationInMinutes % 60) +
              " min "
            }
            route={
              flight.legs[1].origin.displayCode +
              " - " +
              flight.legs[1].destination.displayCode
            }
            stops={flight.legs[1].stopCount}
            price={flight.price.formatted}
            segments={flight.legs[1].segments}
          ></FlightInfo>
        ))}
      </Box>
    </div>
  );
}