import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDto } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto copy';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {}

    @Get()
    async findAllProducts(): Promise<ReturnProductDto[]> {
        return (await this.productService.findAllProducts()).map(
            (produt) => new ReturnProductDto(produt),
        );
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(
        @Body() createProduct: CreateProductDto
    ): Promise<ProductEntity> {
        return this.productService.createProduct(createProduct);
    }

    @Roles(UserType.Admin)
    @Delete('/:productId')
    async deleteProduct(
        @Param('productId') productId: number
    ): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }
}
