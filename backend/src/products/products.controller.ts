import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get(':barcode')
    async findOne(@Param('barcode') barcode: string) {
        const product = await this.productsService.findByBarcode(barcode);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }
}
