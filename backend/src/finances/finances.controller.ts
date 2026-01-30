import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('finances')
@UseGuards(JwtAuthGuard)
export class FinancesController {
    constructor(private readonly financesService: FinancesService) { }

    @Get()
    findAll(@Request() req) {
        return this.financesService.findAll(req.user);
    }

    @Get('balance')
    getBalance(@Request() req) {
        return this.financesService.getBalance(req.user);
    }

    @Post()
    create(@Body() body, @Request() req) {
        return this.financesService.create(body, req.user);
    }
}
