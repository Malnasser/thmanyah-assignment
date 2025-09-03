import { Module } from '@nestjs/common';
import { CmsModule } from './cms/cms.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    CmsModule,
    SharedModule,
    AuthModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
