import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from './users.repository';
import { JwtPayload, SignInResponse } from 'src/types';
import { AuthCredentialsDto } from './dto';
import { decryptPassword } from 'src/helpers';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<SignInResponse> {
    const { username, password } = signInCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await decryptPassword(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
