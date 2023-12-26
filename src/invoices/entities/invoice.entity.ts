import { InvoicesDetail } from 'src/invoices-details/entities/invoices-detail.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sellerid: number;

  @Column()
  customerid: number;

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

  @OneToMany(() => InvoicesDetail, (invoiceDetail) => invoiceDetail.invoice)
  invoiceDetails: InvoicesDetail[];

  @DeleteDateColumn()
  deletedAt: Date;
}
