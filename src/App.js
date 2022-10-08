import { Route, Switch, Redirect } from "react-router-dom";
import Mainpage from "./app/components/pages/mainpage";
import Login from "./app/components/pages/login";
import Episodes from "./app/components/pages/episodes";
import notfound from "./app/components/ui/notfound";
import AppLoader from "./app/components/ui/HOC/appLoader";
import LogOut from "./app/components/pages/logout";
import { Layout } from "antd";
import React, { useState } from "react";
import Siderpage from "./app/components/ui/sider";
import Headerpage from "./app/components/ui/header";
import { Footer } from "antd/es/layout/layout";
import BookmarksPage from "./app/components/pages/bookmarksPage/bookmarksPage";

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const contentStyle = {
    margin: "24px 16px",
    padding: 24,
    minHeight: 280,
    background: "white",
  };
  return (
    <>
      <AppLoader>
        <Layout>
          <Siderpage mode={collapsed} />
          <Layout className="site-layout">
            <Headerpage
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              className="site-layout-background"
            />
            <Content className="site-layout-background" style={contentStyle}>
              <Switch>
                <Route exact path="/" component={Mainpage} />
                <Route path="/episodes/:episodeId?" component={Episodes} />
                <Route path="/login" component={Login} />
                <Route path="/bookmarks" component={BookmarksPage} />
                <Route path="/logout" component={LogOut} />
                <Route path="/404" component={notfound} />
                <Redirect to="/404" />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              2022 Created by dmtrack
            </Footer>
          </Layout>
        </Layout>
      </AppLoader>
    </>
  );
}

export default App;
