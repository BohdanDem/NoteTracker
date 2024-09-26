import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class QueryBoardDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly page?: number = 1;
}
