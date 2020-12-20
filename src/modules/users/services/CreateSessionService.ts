import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import ExceptionHandling from '@shared/errors/ExceptionHandling';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}
interface IReponseUser {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IReponseUser> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ExceptionHandling('Email/password invalid', 401);
    }

    const userPasswordCheck = await this.hashProvider.compare(
      password,
      user.password
    );

    if (!userPasswordCheck) {
      throw new ExceptionHandling('Email/password invalid', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
