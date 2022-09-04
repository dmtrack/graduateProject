import { Route, Switch, Link } from "react-router-dom";
import Edit from "../ui/edit";
import Stats from "../ui/stats";
import React from "react";

const Team = () => {
  return (
    <div className="container-page">
        <h2 className="mb-4 text-dark text-muted">Команда</h2>
        <hr/>

        <Switch>
        <Route path="/team/edit" component={Edit} />
      </Switch>
    </div>
  );
};

export default Team;
