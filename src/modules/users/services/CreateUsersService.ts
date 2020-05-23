import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import ExceptionHandling from '@shared/errors/ExceptionHandling';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new ExceptionHandling('User already exists');
    }

    const hashPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
