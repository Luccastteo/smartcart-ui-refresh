import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { List } from '../lists/list.entity';
import { Transaction } from '../finances/transaction.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => List, (list) => list.user)
    lists: List[];

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];
}
