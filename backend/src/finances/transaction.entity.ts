import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum TransactionType {
    IN = 'IN',
    OUT = 'OUT',
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'simple-enum',
        enum: TransactionType,
    })
    type: TransactionType;

    @Column()
    category: string;

    @Column()
    description: string;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => User, (user) => user.transactions)
    user: User;
}
