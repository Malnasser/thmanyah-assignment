import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './core/config/config.module';
import { CmsModule } from '@cms/cms.module';
import { CoreModule } from '@core/core.module';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { DiscoveryModule } from '@discovery/discovery.module';
import { DatabaseModule } from '@core/database/database.module'; // New import

@Module({
  imports: [
    AppConfigModule,
    CmsModule,
    CoreModule,
    DatabaseModule,
    DiscoveryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
