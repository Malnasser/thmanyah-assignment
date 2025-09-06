import { IBaseRepository } from 'src/cms/common/base/interfaces';
import { User } from '../entities';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
