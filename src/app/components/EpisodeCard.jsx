import React from "react";
import {Button, Card, Dropdown, Menu} from "antd";
import {Link} from "react-router-dom";

const EpisodeCard = ({ episode }) => {
    const style = {
        width: 240

    }
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link to={`/${episode._id}`}>
                            {episode.brief}
                        </Link>
                    ),
                },
                 ]}
        />
    );
  return (
    <Card hoverable style={style}  cover={<img src="https://avatars.mds.yandex.net/i?id=eee7d247dd0bc6cc272b5d965fa0b039-4824764-images-thumbs&n=13&exp=1" className="card-img-top" alt="logo"/>}>
                <Dropdown  overlay={menu} placement="bottom" arrow>
            <Button type={"text"}>{episode.name}</Button>
        </Dropdown>
    </Card>
  );
};

export default EpisodeCard;
