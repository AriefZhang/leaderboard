import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Leaderboard } from './leaderboard.entity';

@Injectable()
export class LeaderboardsRepository extends Repository<Leaderboard> {
  constructor(private dataSource: DataSource) {
    super(Leaderboard, dataSource.createEntityManager());
  }

  async getLeaderboards(): Promise<Leaderboard[]> {
    return await this.find({
      take: 10,
      order: { score: 'DESC' },
    });
  }
}
