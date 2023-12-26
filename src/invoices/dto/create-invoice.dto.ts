import { IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  @IsPositive()
  sellerid: number;

  @IsNumber()
  @IsPositive()
  costumerid: number;

  @IsDateString({ strict: true } as any)
  date: Date;

  @IsNumber()
  @IsPositive()
  total: number;
}
