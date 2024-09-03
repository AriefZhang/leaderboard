import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { encryptPassword } from 'src/helpers';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    try {
      const { username, password, role } = authCredentialsDto;

      const hashedPassword = await encryptPassword(password);
      const user = this.create({
        username,
        password: hashedPassword,
        role,
      });

      await this.save(user);

      return `Success create user: "${user.username}"`;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
