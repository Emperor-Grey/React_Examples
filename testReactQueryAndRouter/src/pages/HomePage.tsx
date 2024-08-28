import { NavLink } from "react-router-dom";
import "../App.css";
export const HomePage = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-full">
      <h1 className="text-6xl text-cyan-500">
        To navigate to the next screen click here
      </h1>
      <NavLink
        to={"/movies"}
        className="mt-10 text-3xl bg-cyan-200 p-3 rounded-md"
      >
        To Movies
      </NavLink>
    </div>
  );
};
