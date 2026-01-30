import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './transaction.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FinancesService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) { }

    async findAll(user: User) {
        return this.transactionsRepository.find({
            where: { user: { id: user.id } },
            order: { date: 'DESC' },
        });
    }

    async getBalance(user: User) {
        const transactions = await this.findAll(user);
        const balance = transactions.reduce((acc, curr) => {
            return curr.type === TransactionType.IN
                ? acc + Number(curr.amount)
                : acc - Number(curr.amount);
        }, 0);

        return { balance };
    }

    async create(data: Partial<Transaction>, user: User) {
        const transaction = this.transactionsRepository.create({
            ...data,
            user,
        });
        return this.transactionsRepository.save(transaction);
    }
}
