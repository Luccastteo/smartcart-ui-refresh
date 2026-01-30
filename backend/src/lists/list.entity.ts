import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ListItem } from './list-item.entity';

@Entity()
export class List {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.lists)
    user: User;

    @OneToMany(() => ListItem, (item) => item.list, { cascade: true })
    items: ListItem[];
}
