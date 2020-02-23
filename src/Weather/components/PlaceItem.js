import React from "react";
import "./PlaceItem.css";

const PlaceItem = props => {
  const weatherData = props.placeData;

  return (
    <div className="place-item">
      <h3>
        {weatherData.name}, {weatherData.sys.country}
      </h3>
      <p>
        {weatherData.weather[0].description}
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="weather icon"
        />
      </p>
      <span>
        {weatherData.main.temp} &deg;
        {props.units === "metric" ? "C" : "F"}
      </span>
      <span>
        Feels Like: {weatherData.main.feels_like} &deg;
        {props.units === "metric" ? "C" : "F"}
      </span>
      <span>Pressure: {weatherData.main.pressure} hPa</span>
      <span>Humidity: {weatherData.main.humidity} % </span>
      <button
        className="btn btn-outline-light"
        onClick={() => {
          props.showDetailsOfPlace(weatherData.id);
        }}
      >
        Show Details
      </button>
    </div>
  );
};

export default PlaceItem;
