import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('CMS Service')
    .setDescription('The CMS service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Bootstrap default user
  const authService = app.get(AuthService);
  const configService = app.get(ConfigService);

  const usersCount = await authService.getUsersCount();

  if (usersCount === 0) {
    const superAdminUsername = configService.get<string>(
      'SUPER_ADMIN_USERNAME',
      'root@example.com',
    );
    const superAdminPassword = configService.get<string>(
      'SUPER_ADMIN_PASSWORD',
      'password',
    );

    await authService.register({
      email: superAdminUsername,
      password: superAdminPassword,
      roles: ['admin'],
    });
    console.log('Default super admin user created.');
  }

  await app.listen(3000);
}
bootstrap();
