import React, { useEffect, useState } from "react";
import EpisodesList from "../ui/episodesList";
import Episode from "./episode";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEpisodes,
  getEpisodesList,
  getEpisodesLoadingStatus,
  getError,
  getFilteredEpisodesList,
} from "../store/slices/episodeSlice";
import EpisodesFilter from "../ui/EpisodesFilter";
import paginate from "../utils/paginate";
import Pagination from "../ui/pagination";

const ITEMS_PER_PAGE = 4;

const Episodes = () => {
  const [page, setPage] = useState(1);
  const episodesLoading = useSelector(getEpisodesLoadingStatus());
  const episodes = useSelector(getEpisodesList());
  const filteredEpisodes = useSelector(getFilteredEpisodesList());
  let episodesAmount = 0
  if (episodes) {episodesAmount = episodes.length}
  const error = useSelector(getError());
  const history = useHistory();
  const params = useParams();
  const { episodeId } = params;
  const dispatch = useDispatch();
  let episodesCrop = []

  const handleOpenCard = (id) => {
    history.push(`/episodes/${id}`);
  };
  useEffect(() => {
    dispatch(fetchEpisodes(page, ITEMS_PER_PAGE));
  }, []);

  function pageChangeHandler(pageIndex) {
    setPage(pageIndex);
  }

  if (
    episodeId === undefined &&
    !filteredEpisodes
  ) {
    episodesCrop = paginate(episodes, page, ITEMS_PER_PAGE);

    return (
      <>
        <div className="container-page mx-auto  ">
          <h2 className='text-dark text-muted'>Эпизоды</h2>
          <hr/>

          <EpisodesFilter />
          {!episodesLoading && episodes && !filteredEpisodes ? (
              <div>
            <EpisodesList episodes={episodesCrop} onOpenCard={handleOpenCard} />
              <p className="text-center text-dark">"КУКУ1"</p>
              </div>
          ) : (
            <p className="text-center text-dark">"Loading..."</p>
          )}
          <div className="d-flex justify-content-center mx-auto max-width: 800px flex-column">
            <Pagination
              itemsCount={episodesAmount}
              pageSize={ITEMS_PER_PAGE}
              currentPage={page}
              onPageChange={pageChangeHandler}
            />
          </div>
        </div>
      </>
    );
  }
  if (episodeId !== undefined) {
    return (
      <>
        <div className="container pt-5 mx-auto">
          <Episode id={episodeId} episodes={episodes} />
        </div>
      </>
    );
  }

  if (filteredEpisodes) {
    let episodesCrop = [];
    episodesCrop = paginate(filteredEpisodes, page, ITEMS_PER_PAGE);
    const filteredAmount = filteredEpisodes.length;
    console.log(episodesCrop, 'episodeCrop')

    return (
      <>
        <div className="container-page mx-auto">
          <h2 className='text-dark text-muted'>Эпизоды</h2>
          <EpisodesFilter />
            <EpisodesList episodes={episodesCrop} onOpenCard={handleOpenCard} />

          <div className="d-flex justify-content-center max-width: 800px flex-column">
            <Pagination
              itemsCount={filteredAmount}
              pageSize={ITEMS_PER_PAGE}
              currentPage={page}
              onPageChange={pageChangeHandler}
            />
          </div>
        </div>
      </>
    );
  }
  if (error) {
    return <p className="text-center text-lg-center text-danger">{error}</p>;
  }
};

export default Episodes;
