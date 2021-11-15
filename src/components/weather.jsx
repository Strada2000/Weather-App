import React, { useState } from "react";
import Forecast from "./Forecast";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./weather.scss";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

export default function Weather() {
  //using city name
  const [weather, setweather] = useState([]);
  const [city, setcity] = useState([]);

  const uriEncodedCity = encodeURIComponent(city);

  //for using cityname
  const getWeather = (e) => {
    e.preventDefault();
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&units=metric`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setweather(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //for using gps
  const getusinglocation = (e) => {
    const success = (position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      fetch(
        `https://community-open-weather-map.p.rapidapi.com/weather?lat=${latitude}&lon=${longitude}&units=metric`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          setweather(response);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const error = () => {
      alert("Unable to retrieve location.");
    };

    const location = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        alert(
          "Your browser does not support location tracking, or permission is denied."
        );
      }
    };

    location();
  };

  return (
    <div className="main">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={20}
      >
        <TextField
          className="text"
          label="City-Name"
          variant="standard"
          value={city}
          onChange={(e) => setcity(e.target.value)}
        />

        <Button variant="outlined" onClick={getWeather} className="button">
          Get Weather
        </Button>
        <Button
          variant="outlined"
          onClick={getusinglocation}
          startIcon={<GpsFixedIcon />}
          className="button"
        >
          GPS
        </Button>
      </Stack>
      <Forecast we={weather} />
    </div>
  );
}
