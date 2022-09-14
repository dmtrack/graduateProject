import React from "react";
import { Col, Layout, Menu, Row } from "antd";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/slices/userSlice";
const { Header } = Layout;

const Headerpage = ({ collapsed, setCollapsed }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        background: "whitesmoke",
      }}
    >
      <Row>
        <Col span={22}>
          {" "}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Col>
        <Col span={2}>{isLoggedIn && <NavProfile />}</Col>
      </Row>
    </Header>
  );
};

export default Headerpage;
