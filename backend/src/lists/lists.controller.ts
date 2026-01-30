import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ListsService } from './lists.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
    constructor(private readonly listsService: ListsService) { }

    @Get()
    findAll(@Request() req) {
        return this.listsService.findAll(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.listsService.findOne(id, req.user);
    }

    @Post()
    create(@Body() body: { title: string }, @Request() req) {
        return this.listsService.create(body.title, req.user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.listsService.delete(id, req.user);
    }

    @Post(':id/items')
    addItem(@Param('id') id: string, @Body() body, @Request() req) {
        return this.listsService.addItem(id, body, req.user);
    }
}
