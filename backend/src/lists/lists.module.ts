import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from './list.entity';
import { ListItem } from './list-item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([List, ListItem])],
    providers: [ListsService],
    controllers: [ListsController],
})
export class ListsModule { }
