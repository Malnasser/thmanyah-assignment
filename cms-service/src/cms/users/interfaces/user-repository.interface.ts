import { IBaseRepository } from '@cms/common/base/interfaces';
import { User } from '@cms/users/entities';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
