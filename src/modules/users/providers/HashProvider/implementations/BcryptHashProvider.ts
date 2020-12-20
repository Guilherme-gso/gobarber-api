import bcrypt from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BcrypHashProvider implements IHashProvider {
  public async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 10);
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
