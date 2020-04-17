import { resolve } from 'path';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';

export default {
  directory: resolve(__dirname, '..', '..', 'tmp'),
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const hashFile = randomBytes(8).toString('HEX');
      const fileName = `${hashFile}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
