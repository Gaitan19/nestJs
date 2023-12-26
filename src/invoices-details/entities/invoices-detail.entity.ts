import { Invoice } from 'src/invoices/entities/invoice.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class InvoicesDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productid: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
  invoice: Invoice;
}
