import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ) {
        const newId = await this.productsService.insertProduct(title, description, price);
        return { id: newId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return await this.productsService.getSingleProduct(id);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ) {
        await this.productsService.updateProduct(id, title, description, price);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string) {
        await this.productsService.deleteProduct(id);
        return null;
    }
}
