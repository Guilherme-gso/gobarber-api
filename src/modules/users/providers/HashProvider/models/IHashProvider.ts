export default interface IHashProvider {
  compare(payload: string, hashed: string): Promise<boolean>;
  hash(payload: string): Promise<string>;
}
