import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  constructor(private usersRepository = getRepository(User)) {}

  public async save(user: User): Promise<User> {
    await this.usersRepository.save(user);

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create(data);

    await this.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }
}
