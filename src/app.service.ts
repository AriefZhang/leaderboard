import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './auth/user.entity';
import { LeaderboardsRepository } from 'src/leaderboards/leaderboards.repository';
import { UsersRepository } from 'src/auth/users.repository';

import { SaveScoreDto } from './app.dto/save-scores.dto';
import { validateScore } from './helpers/validate.helper';
import { Maybe, UserRoles } from './types';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(LeaderboardsRepository)
    private leaderboardsRepository: LeaderboardsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async saveScore(saveScoreDto: SaveScoreDto, user: User): Promise<string> {
    try {
      const { username, score } = saveScoreDto;
      saveScoreDto.score = Math.floor(Number(saveScoreDto.score));
      const isScoreValid = validateScore(score);

      let player: User = user;

      if (!isScoreValid) {
        throw new ConflictException(
          'Min score value = 0 & Max score value = 10',
        );
      }

      if (user.role === UserRoles.ADMIN) {
        const foundPlayer: Maybe<User> = await this.usersRepository.findOneBy({
          username,
        });

        if (!foundPlayer) {
          throw new NotFoundException(`User "${username}" not found`);
        }

        player = foundPlayer;
      }

      const leaderboard = this.leaderboardsRepository.create({
        score,
        user: player,
      });

      await this.leaderboardsRepository.save(leaderboard);

      if (user.role === UserRoles.ADMIN) {
        return `Admin "${user.username}" save a new score for player "${player.username}"`;
      }
      return `User "${player.username}" success save a new score`;
    } catch (error) {
      if ((error.status = 404)) {
        throw new NotFoundException(error.response.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
