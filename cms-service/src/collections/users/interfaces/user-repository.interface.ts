import { IBaseRepository } from 'src/collections/common/base/interfaces/base-repoitory.interface';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
