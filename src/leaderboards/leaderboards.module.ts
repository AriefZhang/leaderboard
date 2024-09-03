import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { LeaderboardController } from './leaderboards.controller';
import { LeaderboardsRepository } from './leaderboards.repository';
import { LeaderboardService } from './leaderboards.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeaderboardsRepository]), AuthModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardsRepository, LeaderboardService],
})
export class LeaderboardModule {}
