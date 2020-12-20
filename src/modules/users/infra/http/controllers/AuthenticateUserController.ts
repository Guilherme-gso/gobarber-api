import CreateSessionService from '@modules/users/services/CreateSessionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUser = container.resolve(CreateSessionService);

    const { user, token } = await createUser.execute({ email, password });

    return response.json({ user, token });
  }
}
