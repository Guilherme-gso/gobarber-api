import FakeDiskStorage from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import ExceptionHandling from '@shared/errors/ExceptionHandling';
import FakeBcryptHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUsersService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDiskStorage = new FakeDiskStorage();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorage
    );
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );

    const user = await createUser.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const response = await updateUserAvatar.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });

    expect(response.avatar).toBe('avatar.jpg');
  });

  it('should be able to delete old avatar to update new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDiskStorage = new FakeDiskStorage();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorage
    );
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBcryptHashProvider
    );

    const deleteFile = jest.spyOn(fakeDiskStorage, 'deleteFile');

    const user = await createUser.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });

    await updateUserAvatar.execute({
      avatarFilename: 'avatar2.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });

  it('should not be update avatar if user not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDiskStorage = new FakeDiskStorage();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorage
    );

    expect(
      updateUserAvatar.execute({
        avatarFilename: 'avatar.jpg',
        user_id: 'no-user',
      })
    ).rejects.toBeInstanceOf(ExceptionHandling);
  });
});
