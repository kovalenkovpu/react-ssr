import * as React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { UserPage } from './pages/User';
import { UserDTO } from './types/user.types';

import "./App.scss";

interface APPDataInterface {
  users: UserDTO[];
  user: UserDTO;
}

interface InitialDataInterface {
  initialData?: APPDataInterface;
}

const App: React.FC<InitialDataInterface> = ({ initialData }) => {
  return (
    <>
      <header>
        <ul className="navigation">
          <li className="navigation-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="navigation-item">
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
      </header>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/users" exact render={({ staticContext }) => <Users users={initialData?.users}/>} />
        <Route path="/users/:userId" render={({ staticContext }) => <UserPage user={initialData?.user} />} />
      </Switch>
    </>
  );
};

export type { APPDataInterface, InitialDataInterface };
export { App };