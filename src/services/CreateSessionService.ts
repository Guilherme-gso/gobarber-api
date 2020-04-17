import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import ExceptionHandling from '../errors/ExceptionHandling';

interface RequestDTO {
  email: string;
  password: string;
}
interface ReponseUser {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<ReponseUser> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new ExceptionHandling('Email/password invalid', 401);
    }

    const userPasswordCheck = await compare(password, user.password);

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
