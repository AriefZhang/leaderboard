import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { User } from './auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { SaveScoreDto } from './app.dto/save-scores.dto';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/scores')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 20, ttl: 10000 } })
  saveScore(
    @Body() saveScoreDto: SaveScoreDto,
    @GetUser()
    user: User,
  ): Promise<string> {
    return this.appService.saveScore(saveScoreDto, user);
  }
}
