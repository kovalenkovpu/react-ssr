import * as React from 'react';
import { useParams } from 'react-router-dom';

import { userService } from '../services/user-service';
import { UserDTO } from '../types/user.types';

interface UserProps {
  user: UserDTO;
}

const UserPage: React.FC<UserProps> = ({ user: initialUserData }) => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = React.useState<UserDTO | null>(initialUserData);

  React.useEffect(() => {
    if (!userData) {
      userService
        .getUser(userId)
        .then(data => setUserData(data));
    }
  }, []);

  return (
    <section className="wrapper">
      <h1>User data:</h1>
      <p>Name: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
      <p>Username: {userData?.username}</p>
    </section>
  );
};

export { UserPage };