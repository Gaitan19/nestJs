import { IsDateString, IsDecimal, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  sellerName: string;

  @IsString()
  costumerName: string;

  @IsDateString({ strict: true } as any)
  date: Date;

  // @IsDecimal()
  @IsNumber()
  total: number;
}
