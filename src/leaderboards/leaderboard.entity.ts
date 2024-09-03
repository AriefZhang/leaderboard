import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/user.entity';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @ManyToOne((_type) => User, (user) => user.leaderboards, { eager: true })
  user: User;
}
