import React, { useEffect } from "react";
import { useInput } from "../../hook/input";
import {} from "../pages/styles/ui.css";


const EpisodesFilter = () => {

  const input = useInput("");


  return (
    <div className="container-search">
      <input
                type="text"
        className="input-search"
        placeholder="Поиск.."
        {...input}
      />
      {/*<div className="search-dropdown shadow-md">dropdown</div>*/}
    </div>
  );
};
export default EpisodesFilter;
