import { IsNumber, IsPositive } from 'class-validator';

export class CreateInvoicesDetailDto {
  @IsNumber()
  @IsPositive()
  productid: number;

  @IsNumber()
  @IsPositive()
  Quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  invoiceId: number;
}
