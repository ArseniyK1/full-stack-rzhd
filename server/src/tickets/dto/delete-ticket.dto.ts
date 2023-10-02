import { IsArray, ArrayNotEmpty, IsInt, ArrayUnique } from 'class-validator';

export class DeleteTicketDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @ArrayUnique()
  remove_count: number;
}
