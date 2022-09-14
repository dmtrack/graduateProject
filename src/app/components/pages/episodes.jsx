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
import paginate from "../utils/paginate";
import { Divider, Input, Pagination } from "antd";

const { Search } = Input;
const ITEMS_PER_PAGE = 4;

const Episodes = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const episodes = useSelector(getEpisodesList());
  const error = useSelector(getError());
  const history = useHistory();
  const params = useParams();
  const { episodeId } = params;
  const dispatch = useDispatch();
  let episodesCrop = [];
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenCard = (id) => {
    history.push(`/episodes/${id}`);
  };
  useEffect(() => {
    dispatch(fetchEpisodes(page, ITEMS_PER_PAGE));
  }, []);

  function pageChangeHandler(page, pageSize) {
    setPage(page);
    setPageSize(pageSize);
  }

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
  };

  if (episodes) {
    function filterEpisodes(data) {
      const filteredEpisodes = searchQuery
        ? data.filter(
            (episode) =>
              episode.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              episode.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
              episode.timecodes
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
        : data;
      return filteredEpisodes;
    }
    const filteredEpisodes = filterEpisodes(episodes);
    const episodesCount = filteredEpisodes.length;
    episodesCrop = paginate(filteredEpisodes, page, ITEMS_PER_PAGE);
    return (
      <>
        <div className="container-page mx-auto  ">
          {episodes && episodeId === undefined && (
            <div className="d-flex justify-content-center mx-auto max-width: 800px flex-column">
              <h2 className="text-dark text-muted">Эпизоды</h2>
              <Divider />
              <div className="container-search">
                <Search
                  placeholder="Поиск..."
                  allowClear
                  onChange={handleSearchQuery}
                  value={searchQuery}
                  style={{ marginBottom: 10 }}
                />
              </div>
              <EpisodesList
                episodes={episodesCrop}
                onOpenCard={handleOpenCard}
              />
              <Pagination
                defaultCurrent={1}
                onChange={(page, pageSize) => pageChangeHandler(page, pageSize)}
                current={page}
                defaultPageSize={pageSize}
                total={filteredEpisodes.length}
                size={"small"}
                hideOnSinglePage={true}
              />
            </div>
          )}

          {episodeId !== undefined && (
            <div className="container pt-5 mx-auto">
              <Episode id={episodeId} episodes={episodes} />
            </div>
          )}
        </div>
      </>
    );
  }
  return "loading...";
};

export default Episodes;
