import { Request, Response } from 'express';

import { renderContent } from '../renderContent';

import { userService } from '../../shared/services/user-service';
import { APPDataInterface } from '../../shared/App';

class UserController {
  async getUsers(
    req: Request,
    res: Response,
  ) {
    try {
      const users = await userService.getUsers();

      const initialData: APPDataInterface = { users, user: null };
      const html = renderContent(req, initialData, {});
      
      return res.send(html);
    } catch (error) {
      console.log('<<<<<<<<<<<<<<<<<<<<<<<ERROR: ', error);
    }
  }

  async getUser(
    req: Request,
    res: Response,
  ) {
    try {
      const { params: { id } } = req;
      const user = await userService.getUser(id);
      
      const initialData: APPDataInterface = { users: [], user };
      const html = renderContent(req, initialData, {});
      
      return res.send(html);
    } catch (error) {
      console.log('<<<<<<<<<<<<<<<<<<<<<<<ERROR: ', error);
    }
  }
}

const userController = new UserController();

export { userController, UserController };
