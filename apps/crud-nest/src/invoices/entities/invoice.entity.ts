import { Customer } from './../../customers/entities/customer.entity';
import { InvoiceDetail } from 'src/invoice-details/entities/invoice-detail.entity';
import { Seller } from 'src/sellers/entities/seller.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new DecimalColumnTransformer(),
  })
  total: number;

  @ManyToOne(() => Seller, (seller) => seller.invoice)
  seller: Seller;

  @ManyToOne(() => Customer, (customer) => customer.invoice)
  customer: Customer;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice)
  invoiceDetails: InvoiceDetail[];

  @DeleteDateColumn()
  deletedAt: Date;
}
