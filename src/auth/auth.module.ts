import { Module } from '@nestjs/common';
import { PassportModule, IAuthModuleOptions } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';
import { JwtStrategy } from './jwt-strategy';

const passportModuleConfig: IAuthModuleOptions = {
  defaultStrategy: 'jwt',
};

const jwtModuleConfig: JwtModuleAsyncOptions = {
  imports: [],
  inject: [],
  useFactory: async () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: 60 * 60 * 24,
    },
  }),
};

@Module({
  imports: [
    PassportModule.register(passportModuleConfig),
    JwtModule.registerAsync(jwtModuleConfig),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
