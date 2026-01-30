import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { List } from './list.entity';

@Entity()
export class ListItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('int', { default: 1 })
    qty: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    price: number;

    @Column({ default: false })
    checked: boolean;

    @ManyToOne(() => List, (list) => list.items, { onDelete: 'CASCADE' })
    list: List;
}
