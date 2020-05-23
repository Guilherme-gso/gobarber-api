import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import User from '@modules/users/infra/typeorm/entities/User';
import ExceptionHandling from '@shared/errors/ExceptionHandling';
import uploadConfig from '@config/upload';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new ExceptionHandling('User not authenticated to update avatar');
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarPathExists = await fs.promises.stat(avatarFilePath);

      if (avatarPathExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
