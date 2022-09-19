import React from "react";
import { Layout, Menu } from "antd";
import {
  ExperimentOutlined,
  HeartFilled,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/slices/userSlice";

const { Sider } = Layout;

const Siderpage = ({ mode }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={mode}
      style={{
        overflow: "revert-layer",
        height: "100vh",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {!isLoggedIn && (
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ExperimentOutlined />,
              label: <Link to="/">О проекте</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to="/episodes">Эпизоды</Link>,
            },

            {
              key: "3",
              icon: <UserOutlined />,
              label: <Link to="/login">Вход</Link>,
            },
          ]}
        />
      )}
      {isLoggedIn && (
        <>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <ExperimentOutlined />,
                label: <Link to="/">О проекте</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to="/episodes">Эпизоды</Link>,
              },
              {
                key: "3",
                icon: <HeartFilled />,
                label: <Link to="/bookmarks">Избранное</Link>,
              },
            ]}
          />
        </>
      )}
    </Sider>
  );
};

export default Siderpage;
