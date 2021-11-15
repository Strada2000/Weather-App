import React from "react";
import "./forecast.scss";
import Stack from "@mui/material/Stack";
import { Clock } from "./clock";
import Currdate from "./currdate";

const Forecast = (props) => {
  const error = () => {
    if (props.we.cod) {
      return <p>Enter correct City-name</p>;
    }
  };
  return (
    <div className="main">
      {props.we.cod === 200 ? (
        <Stack spacing={-3} className="cardmain">
          <Stack
            direction="row"
            justifyContent="space-between"
            className="upperstack"
            spacing={0}
          >
            <Clock />
            <Currdate />
          </Stack>
          <Stack
            direction="column"
            justifyContent="space-between"
            className="mainstack"
          >
            <Stack direction="row" justifyContent="space-between">
              <img
                src={`http://openweathermap.org/img/wn/${props.we.weather[0].icon}@2x.png`}
                alt="error"
              ></img>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={-3}
              >
                <h2>
                  {props.we.name}, {props.we.sys.country}
                </h2>
                <p>{props.we.weather[0].description}</p>
              </Stack>
            </Stack>
            <p>feels like {props.we.main.feels_like}&deg;C</p>
            <p className="maintemp">{props.we.main.temp}&deg;C</p>
            <Stack direction="row" justifyContent="space-between">
              <p>Low {props.we.main.temp_min}&deg;C</p>
              <p>High {props.we.main.temp_max}&deg;C</p>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <p>Wind Speed {props.we.wind.speed}m/s</p>
              <p>Humidity {props.we.main.humidity}%</p>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        error()
      )}
    </div>
  );
};
export default Forecast;
