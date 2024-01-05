import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalColumnTransformer } from '../../utils/columnNumericTransformer';
import { Product } from '../../products/entities/product.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity()
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  price: number;

  @ManyToOne(() => Product, (product) => product.invoiceDetails)
  product: Product;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
  invoice: Invoice;
}
