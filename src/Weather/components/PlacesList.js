import React, { useEffect, useState, useContext, useCallback } from "react";
import PlaceItem from "./PlaceItem";
import "./PlacesList.css";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const PlacesList = props => {
  const places = props.places;
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const units = auth.units;

  const fetchWeatherData = useCallback(() => {
    setIsLoading(true);
    let placesQuery = "";

    places.forEach(place => (placesQuery = placesQuery.concat(place + ",")));

    fetch(
      `http://api.openweathermap.org/data/2.5/group?id=${placesQuery}&units=${units}&appid=fa3c74321804bba1ba4fb45bd7db3161 `
    )
      .then(res => res.json())
      .then(res => {
        if (res.list) setPlacesData(res.list);

        setIsLoading(false);
      });
  }, [places, units]);

  useEffect(() => {
    fetchWeatherData();
    const timer = setInterval(fetchWeatherData, 1000 * 60);

    return () => {
      clearInterval(timer);
    };
  }, [fetchWeatherData]);

  if (placesData.length === 0) {
    return <div>Nie masz obserwowanych miejsc</div>;
  } else {
    const placesList = placesData.map(place => (
      <PlaceItem
        key={place.id}
        placeData={place}
        units={units}
        showDetailsOfPlace={props.showDetailsOfPlace}
      />
    ));

    return (
      <div className="places-list">
        <h4>Your places</h4>
        {isLoading && <LoadingSpinner />}
        <div className="places-list__your-places">{placesList}</div>
      </div>
    );
  }
};

export default PlacesList;
