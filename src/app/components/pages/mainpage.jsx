import React from "react";
import { Col, Divider, Row } from "antd";
import { Typography } from "antd";
const { Title, Text } = Typography;

const Mainpage = () => {
  return (
    <>
      <Row>
        <Col span={1}></Col>
        <Col span={21}>
          <Title level={3}>О проекте</Title>
          <Divider />
          <Row>
            <Text>Some text...(default)</Text>
          </Row>
        </Col>
        <Col span={1}></Col>
      </Row>
    </>
  );
};

export default Mainpage;
