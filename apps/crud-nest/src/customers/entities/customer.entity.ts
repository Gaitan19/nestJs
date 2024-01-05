import { Invoice } from 'src/invoices/entities/invoice.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoice: Invoice[];
}
