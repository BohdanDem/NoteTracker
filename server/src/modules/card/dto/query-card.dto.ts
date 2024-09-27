import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class QueryCardDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 7;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly page?: number = 1;
}
