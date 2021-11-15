import Weather from "./components/weather.jsx";
import React from "react";
import "./app.scss";

function App() {
  return (
    <div className="app">
      <h1 className="h1">Weather App</h1>
      <Weather />
    </div>
  );
}

export default App;
