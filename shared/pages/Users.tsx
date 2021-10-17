import * as React from 'react';

import { User } from 'shared/App';

interface UsersProps {
  users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <>
      {users.map(user => <article key={user.id}>{user.name}</article>)}
    </>
  );
};

export type { User };
export { Users };