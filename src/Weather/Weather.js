import React from "react";
import "./Weather.css";
import Places from "./Places";

const Weather = props => {
  return (
    <div className="container weather">
      <Places />
    </div>
  );
};

export default Weather;
