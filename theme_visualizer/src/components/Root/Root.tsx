import { Outlet } from "react-router-dom";
import TaskBar from "../TaksBar/TaskBar";

const Root = () => (
  <>
    <TaskBar />
    <Outlet />
  </>
);

export default Root;
