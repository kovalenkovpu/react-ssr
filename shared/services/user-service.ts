import axios from "axios";

import { UserDTO } from "../types/user.types";

class UserService {
  async getUsers() {
    const {
      data,
    } = await axios.get<UserDTO[]>('https://jsonplaceholder.typicode.com/users');

    return data;
  }

  async getUser(id: string) {
    const {
      data,
    } = await axios.get<UserDTO>(`https://jsonplaceholder.typicode.com/users/${id}`);

    return data;
  }
}

const userService = new UserService();

export { userService, UserService };