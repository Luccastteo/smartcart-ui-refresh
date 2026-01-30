import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryColumn()
    barcode: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    image: string;
}
