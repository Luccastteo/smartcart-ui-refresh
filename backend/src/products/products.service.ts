import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async onModuleInit() {
        await this.seed();
    }

    async findByBarcode(barcode: string): Promise<Product | null> {
        return this.productsRepository.findOne({ where: { barcode } });
    }

    async seed() {
        const count = await this.productsRepository.count();
        if (count === 0) {
            const data = [
                { barcode: '7891000053508', name: 'Coca-Cola 2L', price: 9.50, image: 'https://img.clubeextra.com.br/img/uploads/1/350/579350.png' },
                { barcode: '7891000100103', name: 'Leite Integral 1L', price: 4.80, image: 'https://m.media-amazon.com/images/I/61k1Jk+V1+L._AC_SX679_.jpg' },
                { barcode: '7896003700021', name: 'Pão de Forma Visconti', price: 6.90, image: 'https://static.paodeacucar.com/img/uploads/1/640/538640.png' },
            ];
            await this.productsRepository.save(data);
            console.log('Seeded initial products');
        }
    }
}
