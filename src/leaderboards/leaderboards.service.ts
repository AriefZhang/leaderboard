import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from './leaderboard.entity';
import { LeaderboardsRepository } from './leaderboards.repository';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(LeaderboardsRepository)
    private leaderboardsRepository: LeaderboardsRepository,
  ) {}

  async getLeaderboards(): Promise<Leaderboard[]> {
    return await this.leaderboardsRepository.getLeaderboards();
  }
}
