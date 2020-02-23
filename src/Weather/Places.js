import React, { useEffect, useContext, useState, useCallback } from "react";
import PlacesList from "./components/PlacesList";
import UserPanel from "../User/UserPanel";
import UnitControls from "./components/UnitControls";
import { dummy_users } from "../dummy_database/dummy_users";
import { AuthContext } from "../shared/context/AuthContext";
import cities from "../dummy_database/city.list.json";
import "./Places.css";
import PlaceDetails from "./components/PlaceDetails";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [placeQuery, setPlaceQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState();
  const [isYourPlace, setIsYourPlace] = useState(true);
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  useEffect(() => {
    const user = dummy_users.find(user => user.id === userId);

    setPlaces(user.places);
    setSelectedPlace(user.places[0]);
  }, [userId]);

  const checkIsYourPlace = placeId => {
    const user = dummy_users.find(user => user.id === userId);
    const foundPlace = user.places.find(place => place === placeId);

    if (foundPlace) {
      setIsYourPlace(true);
    } else {
      setIsYourPlace(false);
    }
  };

  const addToYourPlacesHandler = useCallback(() => {
    const user = dummy_users.find(user => user.id === auth.userId);
    const foundPlace = user.places.find(place => place === selectedPlace);

    if (foundPlace) {
      user.places = user.places.filter(place => place !== selectedPlace);
      setIsYourPlace(false);
    } else {
      user.places = [...user.places, selectedPlace];
      setIsYourPlace(true);
    }

    setPlaces(user.places);
  }, [auth.userId, selectedPlace]);

  const handleChange = event => {
    setPlaceQuery(event.target.value);
  };

  const changeSelectedPlace = placeId => {
    checkIsYourPlace(placeId);

    setSelectedPlace(placeId);
  };

  const handleSearch = event => {
    event.preventDefault();

    const city = cities.find(
      city => city.name.toLowerCase() === placeQuery.toLowerCase()
    );

    if (!city) {
      setSelectedPlace(null);
    } else {
      checkIsYourPlace(city.id);
      setSelectedPlace(city.id);
    }
  };

  return (
    <div className="places-main">
      <div className="places-control-panel">
        <form onSubmit={handleSearch} className="form-inline">
          <div className="form-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Search over places..."
              value={placeQuery}
              onChange={handleChange}
            />
            <button className="btn btn-primary ml-1" type="submit">
              Search
            </button>
          </div>
        </form>
        <UnitControls />
        <UserPanel />
      </div>
      <div className="places-data">
        <PlacesList places={places} showDetailsOfPlace={changeSelectedPlace} />
        <PlaceDetails
          isYourPlace={isYourPlace}
          placeId={selectedPlace}
          addToYourPlacesHandler={addToYourPlacesHandler}
        />
      </div>
    </div>
  );
};

export default Places;
