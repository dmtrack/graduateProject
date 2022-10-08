import React from "react";
import CommentsNew from "./commentsNew";

import { Col, Divider, Image, Row, Tooltip } from "antd";
import { Typography } from "antd";
import youTubeLogo from "../../../youtubelogo.svg";
import vkLogo from "../../../vklogo.svg";

const { Title, Text } = Typography;

const Episode = ({ id, episodes }) => {
  const getEdpisodeById = (id) => {
    return episodes.find((episode) => episode._id.toString() === id);
  };
  const episode = getEdpisodeById(id);
  console.log(episode);
  return (
    <>
      <Row>
        <Col span={1}></Col>
        <Col span={21}>
          <Title level={3}>
            {episode ? episode.title : `Выпуск с id: ${id}  не найден`}
          </Title>
          <Row>
            <Title level={3}>{episode.name}</Title>
          </Row>

          <Divider />
          <Row>
            <p>
              <Text>{episode.brief}(default)</Text>
            </p>
          </Row>
          <Row>
            <Col>
              <Text keyboard>{episode.timecodes}(keyboard)</Text>
            </Col>
          </Row>
          <Divider />
          <Row
            style={{
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <Col span={2}>>>></Col>

            <Col span={2} style={{ marginLeft: "5px" }}>
              <a href={episode.youtubeURL}>
                <Image
                  src={youTubeLogo}
                  style={{ width: 25, height: 25 }}
                  preview={false}
                />
              </a>
            </Col>
            <Col span={2} style={{ marginLeft: "5px" }}>
              <a href={episode.vkURL}>
                <Image
                  src={vkLogo}
                  style={{ width: 20, height: 20 }}
                  preview={false}
                />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={1}></Col>
        <Col span={21}>
          <CommentsNew episodeId={id} />
        </Col>
        <Col span={1}></Col>
      </Row>
    </>
  );
};

export default Episode;
