import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { ListItem } from './list-item.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List)
        private listsRepository: Repository<List>,
        @InjectRepository(ListItem)
        private listItemsRepository: Repository<ListItem>,
    ) { }

    async findAll(user: User): Promise<List[]> {
        return this.listsRepository.find({
            where: { user: { id: user.id } },
            relations: ['items'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string, user: User): Promise<List> {
        const list = await this.listsRepository.findOne({
            where: { id, user: { id: user.id } },
            relations: ['items'],
        });
        if (!list) throw new NotFoundException('List not found');
        return list;
    }

    async create(title: string, user: User): Promise<List> {
        const list = this.listsRepository.create({
            title,
            user,
        });
        return this.listsRepository.save(list);
    }

    async addItem(listId: string, itemData: Partial<ListItem>, user: User) {
        const list = await this.findOne(listId, user);
        const item = this.listItemsRepository.create({
            ...itemData,
            list,
        });
        return this.listItemsRepository.save(item);
    }

    async removeItem(itemId: string) {
        return this.listItemsRepository.delete(itemId);
    }

    async delete(id: string, user: User): Promise<void> {
        const result = await this.listsRepository.delete({ id, user: { id: user.id } });
        if (result.affected === 0) throw new NotFoundException('List not found');
    }
}
