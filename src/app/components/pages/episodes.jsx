import React, { useEffect, useState } from "react";
import EpisodesList from "../ui/episodesList";
import Episode from "../ui/episode";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEpisodes,
  getEpisodesBookmarkedStatus,
  getEpisodesList,
  getError,
  toggleEpisodesBookmarks,
} from "../store/slices/episodeSlice";
import paginate from "../utils/paginate";
import { Col, Divider, Input, Pagination, Row } from "antd";
import { getIsLoggedIn } from "../store/slices/userSlice";
import { Typography } from "antd";
const { Title, Text } = Typography;

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
  const isAuth = useDispatch(getIsLoggedIn());

  const handleOpenCard = (id) => {
    history.push(`/episodes/${id}`);
  };

  const handleToggleBookmark = (id) => {
    if (isAuth) {
      dispatch(toggleEpisodesBookmarks(id));
    } else {
      history.push("/login");
    }
  };
  // const isSelectedEpisode = (id) => dispatch(getEpisodesBookmarkedStatus(id));

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
    episodesCrop = paginate(filteredEpisodes, page, ITEMS_PER_PAGE);
    return (
      <>
        {episodes && episodeId === undefined && (
          <Row>
            <Col span={1}></Col>
            <Col span={21}>
              <Title level={3}>Эпизоды</Title>

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
                onToggleBookmark={handleToggleBookmark}
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
            </Col>
            <Col span={1}></Col>
          </Row>
        )}

        {episodeId !== undefined && (
          <div>
            <Episode id={episodeId} episodes={episodes} />
          </div>
        )}
      </>
    );
  }
  return "loading...";
};

export default Episodes;
