import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/AuthContext";
import "./UnitControls.css";

const UnitControls = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="unit-controls">
      <button
        className={`btn ${
          auth.units === "metric" ? "btn-primary" : "btn-outline-secondary"
        }`}
        onClick={() => auth.changeUnits("metric")}
      >
        &deg;C
      </button>

      <button
        className={`btn ${
          auth.units === "metric" ? "btn-outline-secondary" : "btn-primary"
        }`}
        onClick={() => auth.changeUnits("imperial")}
      >
        &deg;F
      </button>
    </div>
  );
};

export default UnitControls;
