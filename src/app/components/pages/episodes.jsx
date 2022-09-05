import React, { useEffect, useState } from "react";
import EpisodesList from "../ui/episodesList";
import Episode from "./episode";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEpisodes,
  getEpisodesList,
  getError,
} from "../store/slices/episodeSlice";
import EpisodesFilter from "../ui/EpisodesFilter";
import paginate from "../utils/paginate";
import Pagination from "../ui/pagination";

const ITEMS_PER_PAGE = 2;

const Episodes = () => {
  const [page, setPage] = useState(1);
  const episodes = useSelector(getEpisodesList());
  const error = useSelector(getError());
  const history = useHistory();
  const params = useParams();
  const {episodeId} = params;
  const dispatch = useDispatch();
  let episodesCrop = []
  const [searchQuery, setSearchQuery] = useState("");


  const handleOpenCard = (id) => {
    history.push(`/episodes/${id}`);
  };
  useEffect(() => {
    dispatch(fetchEpisodes(page, ITEMS_PER_PAGE));
  }, []);

  function pageChangeHandler(pageIndex) {
    setPage(pageIndex);
  }

  const handleSearchQuery = ({target}) => {
    setSearchQuery(target.value);
  };

  if (episodes) {
    function filterEpisodes(data) {
      const filteredEpisodes = searchQuery
          ? data.filter(
              (episode) =>
                  episode.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 || episode.brief.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 || episode.timecodes.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          ) : data;
      return filteredEpisodes
    }
    const filteredEpisodes = filterEpisodes(episodes)
    const episodesCount = filteredEpisodes.length
    episodesCrop = paginate(filteredEpisodes, page, ITEMS_PER_PAGE);
    return (
        <>
        <div className="container-page mx-auto  ">
          {episodesCount > 0 && episodeId === undefined && (
              <div className="d-flex justify-content-center mx-auto max-width: 800px flex-column">
                <h2 className='text-dark text-muted'>Эпизоды</h2>
                <hr/>
                <div className="container-search">
                  <input
                      type="text"
                      name="searchQuery"
                      className="input-search"
                      placeholder="Поиск.."
                      onChange={handleSearchQuery}
                      value={searchQuery}
                  />
                </div>
                <EpisodesList episodes={episodesCrop} onOpenCard={handleOpenCard} />
                <Pagination
                    itemsCount={episodesCount}
                    pageSize={ITEMS_PER_PAGE}
                    currentPage={page}
                    onPageChange={pageChangeHandler}
                />
              </div>)}

          {episodeId !== undefined && (
            <div className="container pt-5 mx-auto">
            <Episode id={episodeId} episodes={episodes} />
            </div>
            )}
          </div>
        </>
          )}
  return "loading...";
}

export default Episodes;
