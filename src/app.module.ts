import { NestModule, Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { typeOrmModule } from './config/typeorm.config';
import { LeaderboardModule } from './leaderboards/leaderboards.module';
import { LeaderboardsRepository } from './leaderboards/leaderboards.repository';
import { UsersRepository } from './auth/users.repository';
import { AppLoggerMiddleware } from './middleware/app-logger.middleware';

const importModules = [
  ConfigModule.forRoot({ isGlobal: true }),
  AuthModule,
  LeaderboardModule,
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return typeOrmModule(configService);
    },
  }),
  TypeOrmModule.forFeature([LeaderboardsRepository]),
  TypeOrmModule.forFeature([UsersRepository]),
  ThrottlerModule.forRoot([
    {
      ttl: 60000,
      limit: 100,
    },
  ]),
];

@Module({
  imports: importModules,
  controllers: [AppController],
  providers: [AppService, JwtModule, LeaderboardsRepository, UsersRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
