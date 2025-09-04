import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { BaseService } from '../common/base/base.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
  ) {
    super(userRepository, cacheManager, User);
  }
}
