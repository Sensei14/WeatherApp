import React, { useEffect, useContext, useState } from "react";
import "./PlaceDetails.css";
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryLabel,
  VictoryLine
} from "victory";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const PlaceDetails = props => {
  const placeId = props.placeId;
  const auth = useContext(AuthContext);
  const units = auth.units;
  const [place, setPlace] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showHumidityChart, setShowHumidityChart] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=${placeId}&units=${units}&appid=fa3c74321804bba1ba4fb45bd7db3161 `
    )
      .then(response => response.json())
      .then(res => {
        if (res.cod === "200") {
          setPlace(res);
        }
        setIsLoading(false);
      });
  }, [placeId, units, auth.userId]);

  const showHumiChart = () => {
    setShowHumidityChart(!showHumidityChart);
  };

  if (isLoading && !place) {
    return (
      <div className="place-details ">
        <LoadingSpinner />
        <p>Searching...</p>
      </div>
    );
  }

  if (!placeId || !place) {
    return (
      <div className="place-details place-details--error">
        <p>Could not find this place.</p>
        <p>Please try some other places.</p>
      </div>
    );
  }

  const chartTempData = [];

  for (let i = 0; i < 7; i++) {
    let x = new Date(place.list[i].dt_txt);
    x = x.getHours();
    if (x === 0) {
      x = "0" + x + ":00";
    } else {
      x = x + ":00";
    }
    chartTempData.push({
      x: x,
      y: Math.floor(place.list[i].main.temp)
    });
  }

  const chartHumiData = [];

  for (let i = 0; i < 7; i++) {
    let x = new Date(place.list[i].dt_txt);
    x = x.getHours();
    if (x === 0) {
      x = "0" + x + ":00";
    } else {
      x = x + ":00";
    }
    chartHumiData.push({
      x: x,
      y: place.list[i].main.humidity
    });
  }

  return (
    <div className="place-details">
      {isLoading && <LoadingSpinner />}
      <div className="place-detals__place-data">
        <h3> {place.city.name}</h3>
        <img
          src={`http://openweathermap.org/img/wn/${place.list[0].weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p>{place.list[0].weather[0].description}</p>
        <span>
          {place.list[0].main.temp} &deg;
          {auth.units === "metric" ? "C" : "F"}
        </span>
        <span>
          Feels Like: {place.list[0].main.feels_like} &deg;
          {auth.units === "metric" ? "C" : "F"}
        </span>
        <span>Pressure: {place.list[0].main.pressure} hPa</span>
        <span>Humidity: {place.list[0].main.humidity} % </span>
      </div>
      <VictoryChart
        theme={VictoryTheme.grayscale}
        domainPadding={10}
        animate={{ duration: 1000 }}
      >
        <VictoryLabel text={"Temperature"} textAnchor="middle" x={220} y={10} />
        <VictoryLine
          style={{
            data: { stroke: "#182c75" }
          }}
          data={chartTempData}
        />
      </VictoryChart>

      {showHumidityChart && (
        <VictoryChart
          theme={VictoryTheme.grayscale}
          domainPadding={10}
          animate={{ duration: 1000 }}
        >
          <VictoryLabel text={"Humidity"} textAnchor="middle" x={220} y={10} />
          <VictoryBar
            alignment="start"
            barWidth={10}
            style={{
              data: { fill: "#182c75" }
            }}
            data={chartHumiData}
          />
        </VictoryChart>
      )}

      <button className="btn btn-dark  mb-2" onClick={showHumiChart}>
        {showHumidityChart ? "Hide humidity chart" : "Show humidity chart"}
      </button>
      <button
        className="btn btn-outline-primary btn-lg"
        onClick={props.addToYourPlacesHandler}
      >
        {props.isYourPlace ? "REMOVE FROM YOUR PLACES" : "ADD TO YOUR PLACES"}
      </button>
    </div>
  );
};

export default PlaceDetails;
