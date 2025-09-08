import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppConfigModule {}
