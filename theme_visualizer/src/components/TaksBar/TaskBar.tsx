import { NavLink } from "react-router-dom";
import "./TaskBar.css";

const TaskBar = () => {
  return (
    <div className="TaskBar">
      <img src="logos/png/logo-no-background.png" alt="teme" />

      <div className="links">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Visualizer
        </NavLink>
        <NavLink
          to="/ThemeCreator"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Theme Creator
        </NavLink>
      </div>
    </div>
  );
};

export default TaskBar;
