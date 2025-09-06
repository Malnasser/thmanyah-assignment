import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities';
import { UserRepository } from './users.repository';
import { BaseService } from '@cms/common/base/base.service';
import { ICacheService } from '@core/cache/interfaces/cache-service.interface';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: UserRepository,
    @Inject('ICacheService') cacheService: ICacheService,
  ) {
    super(userRepository, cacheService, User);
  }
}
