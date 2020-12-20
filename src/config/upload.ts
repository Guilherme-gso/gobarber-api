import { resolve } from 'path';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  uploadsFolder: resolve(tmpFolder, 'uploads'),
  directory: tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const hashFile = randomBytes(8).toString('hex');
      const fileName = `${hashFile}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
