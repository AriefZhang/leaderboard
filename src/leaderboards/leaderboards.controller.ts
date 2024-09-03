import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Leaderboard } from './leaderboard.entity';
import { LeaderboardService } from './leaderboards.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('leaderboard')
@UseGuards(AuthGuard())
export class LeaderboardController {
  constructor(private leaderboardsService: LeaderboardService) {}

  @Get()
  getLeaderboards(@GetUser() user: User): Promise<Leaderboard[]> {
    return this.leaderboardsService.getLeaderboards();
  }
}
