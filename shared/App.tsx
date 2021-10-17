import * as React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";

import { Home } from "./pages/Home";
import { Users } from "./pages/Users";

import "./App.scss";

interface User {
  id: number;
  name: string;
}

interface APPDataInterface {
  count: number;
  users: User[];
}

interface InitialDataInterface {
  initialData?: APPDataInterface;
}

const App: React.FC<InitialDataInterface> = ({ initialData }) => {
  return (
    <>
      <ul>
        Navigation:
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact>
          <Home count={initialData?.count}/>
        </Route>
        <Route path="/users" render={({ staticContext }) => <Users users={initialData.users}/>} />
      </Switch>
    </>
  );
};

export type { User, InitialDataInterface };
export { App };