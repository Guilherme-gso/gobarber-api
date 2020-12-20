import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ExceptionHandling from '@shared/errors/ExceptionHandling';
import FakeBcryptHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUsersService';

describe('CreateSession', () => {
  it('should create an session to user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );

    await createUser.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const session = await createSession.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(session).toHaveProperty('user');
    expect(session).toHaveProperty('token');
  });

  it('should be not create an session if email not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );

    await createUser.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'johndoe2@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(ExceptionHandling);
  });

  it('should be not create an sessions if password is invalid', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );

    await createUser.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'johndoe@gmail.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(ExceptionHandling);
  });
});
