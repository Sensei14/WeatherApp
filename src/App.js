import React, { useState, useCallback } from "react";
import "./App.css";
import { AuthContext } from "./shared/context/AuthContext";
import { dummy_users } from "./dummy_database/dummy_users";
import Auth from "./User/Auth";
import Weather from "./Weather/Weather";

function App() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric");

  const login = useCallback((login, password) => {
    const user = dummy_users.find(
      user => user.login === login && user.password === password
    );

    if (!user) {
      setError("Wrong credentials.");
    } else {
      setUserId(user.id);
      setUsername(user.login);
      setError(null);
    }
  }, []);

  const logout = () => {
    setUserId(null);
    setUsername(null);
  };

  const changeUnits = unit => {
    setUnits(unit);
  };

  const content = !userId ? (
    <>
      <Auth login={login} error={error} />
    </>
  ) : (
    <Weather />
  );

  return (
    <AuthContext.Provider
      value={{ login, userId, logout, username, units, changeUnits }}
    >
      <div className="App">{content}</div>
    </AuthContext.Provider>
  );
}

export default App;
