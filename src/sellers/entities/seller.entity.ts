import {
    Column,
    DeleteDateColumn,
    Entity,
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
}
