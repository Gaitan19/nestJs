import { Invoice } from 'src/invoices/entities/invoice.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvoiceDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productid: number;

    @Column()
    quantity: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new DecimalColumnTransformer(),
    })
    price: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
    invoice: Invoice;
}
