import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CmsModule } from '@cms/cms.module';
import { CoreModule } from '@core/core.module';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { DiscoveryModule } from '@discovery/discovery.module';
import { DatabaseModule } from '@core/database/database.module'; // New import

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CmsModule,
    CoreModule,
    DatabaseModule, // Use the new DatabaseModule
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
