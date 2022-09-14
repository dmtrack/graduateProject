import React from "react";
import EpisodeCard from "../EpisodeCard";
import PropTypes from "prop-types";
import {Card, Col, List, Row} from "antd";
import episode from "../pages/episode";

const EpisodesList = ({ episodes, onOpenCard }) => {
  const handleClick = (id) => {
    onOpenCard(id);
  };
  return (
    <>
      <List grid ={{gutter: 16, column: 2}}
            dataSource={episodes}
            renderItem = {(item) => (
                <List.Item><Card hoverable style={{background: "whitesmoke", cursor: "pointer"}} title={`${item.date} / ${item.name}`}  onClick={()=>handleClick(item._id)}>{item.brief}</Card></List.Item> )} >
      </List>
    </>
  );
};

EpisodesList.propTypes = {
  episodes: PropTypes.array,
  onOpenCard: PropTypes.func,
};

export default EpisodesList;
