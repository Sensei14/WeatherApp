import React, { useContext } from "react";
import { AuthContext } from "../shared/context/AuthContext";
import "./UserPanel.css";

const UserPanel = props => {
  const auth = useContext(AuthContext);

  return (
    <div className="user-panel">
      <button className="btn btn-outline-secondary" onClick={auth.logout}>
        LOGOUT
      </button>
    </div>
  );
};

export default UserPanel;
