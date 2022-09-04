import { Route, Switch, Redirect } from "react-router-dom";
import Mainpage from "./app/components/pages/mainpage";
import Login from "./app/components/pages/login";
import Episodes from "./app/components/pages/episodes";
import Team from "./app/components/pages/team";
import notfound from "./app/components/ui/notfound";
import NavBarNew from "./app/components/ui/navBar new";
import AppLoader from "./app/components/ui/HOC/appLoader";
import LogOut from "./app/components/pages/logout";

function App() {
  return (
    <>
      <div className="container d-flex flex-column flex-md-row">
        <AppLoader>
        <NavBarNew />
        <main className="ps-0 ps-md-5 flex-grow-1">
          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route path="/episodes/:episodeId?" component={Episodes} />
            <Route path="/login" component={Login} />
            <Route path="/team" component={Team} />
            <Route path="/logout" component={LogOut} />
            <Route path="/404" component={notfound} />
            <Redirect to="/404" />
          </Switch>
        </main>
        </AppLoader>
      </div>
    </>
  );
}

export default App;
