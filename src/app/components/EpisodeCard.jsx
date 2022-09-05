import React from "react";

const EpisodeCard = ({ episode }) => {
    const style = {
        width: 280,
        padding: 5,
    }

  return (
    <div className="card" style={style}>
        <img src="https://avatars.mds.yandex.net/i?id=eee7d247dd0bc6cc272b5d965fa0b039-4824764-images-thumbs&n=13&exp=1" className="card-img-top" alt="logo"/>
            <div className="card-body">
                <p className="card-text"><p className="text-secondary">{episode.name}</p>{episode.brief}   </p>
            </div>
    </div>
  );
};

export default EpisodeCard;
