import React from "react";
import EpisodeCard from "../EpisodeCard";
import PropTypes from "prop-types";

const EpisodesList = ({ episodes, onOpenCard }) => {
  const handleClick = (id) => {
    onOpenCard(id);
  };
  return (
    <>
      <div className="card-body text-center">
        <div className="row g-6">
          {episodes.map((episode) => (
            <div
              className="col-6 d-flex flex-column align-items-center "
              key={episode._id}
            >
              <div className="pt-3 pb-3" onClick={() => handleClick(episode._id)}>
                <EpisodeCard key={episode._id} episode={episode} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

EpisodesList.propTypes = {
  episodes: PropTypes.array,
  onOpenCard: PropTypes.func,
};

export default EpisodesList;
