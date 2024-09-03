import { IsNotEmpty, IsString, IsNumber, Max } from 'class-validator';

export class SaveScoreDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  score: number;
}
