import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Leaderboard } from 'src/leaderboards/leaderboard.entity';
import { UserRoles } from 'src/types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: UserRoles;

  @OneToMany((_type) => Leaderboard, (leaderboard) => leaderboard.user, {
    eager: false,
  })
  leaderboards: Leaderboard[];
}
