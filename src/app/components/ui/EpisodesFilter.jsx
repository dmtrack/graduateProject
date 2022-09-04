import React, { useEffect } from "react";
import { useInput } from "../../hook/input";
import {} from "../pages/styles/ui.css";
import {
  getFilterEpisodes,
  removeFilterEpisodes,
} from "../store/slices/episodeSlice";
import { useDispatch } from "react-redux";

const EpisodesFilter = () => {
  const dispatch = useDispatch();
  const input = useInput("");

  useEffect(() => {
    console.log(input.value.length, "input")
    if (input.value.length > 3) {
      console.log('фильтр срабатывает')
      dispatch(getFilterEpisodes(input.value));
    }
    if (input.value.length < 3) {
      console.log('срабатывает сброс')
      dispatch(removeFilterEpisodes());
    }
  }, [input.value]);

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
