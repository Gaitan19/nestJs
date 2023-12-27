import { Invoice } from 'src/invoices/entities/invoice.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Invoice, (invoice) => invoice.seller)
  invoice: Invoice[];
}
