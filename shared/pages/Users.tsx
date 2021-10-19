import * as React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../services/user-service';
import { UserDTO } from '../types/user.types';

interface UsersProps {
  users: UserDTO[];
}

const Users: React.FC<UsersProps> = ({ users = [] }) => {
  const [usersData, setUsersData] = React.useState<UserDTO[]>(users);

  React.useEffect(() => {
    if (usersData.length === 0) {
      userService
        .getUsers()
        .then(data => setUsersData(data));
    }
  }, []);

  return (
    <section className="wrapper">
      <h1>Users list:</h1>
      {
        usersData.map(user => (
          <article key={user.id}>
            <Link to={`users/${user.id}`}>{user.name}</Link>
          </article>
        ))
      }
    </section>
  );
};

export { Users };