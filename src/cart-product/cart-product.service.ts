import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cart-product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDto } from '../cart/dtos/insert-cart.dto';
import { CartEntity } from '../cart/entity/cart.entity';
import { ProductService } from '../product/product.service';
import { UpdateCartDto } from 'src/cart/dtos/update-cart.dto';

@Injectable()
export class CartProductService {
    constructor(
        @InjectRepository(CartProductEntity)
        private readonly cartProductRepository: Repository<CartProductEntity>,
        private readonly productService: ProductService
    ) {}

    async verifyProductInCart(productId: number, cartId: number): Promise<CartProductEntity> {
        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                productId,
                cartId,
            }
        });

        if (!cartProduct) {
            throw new NotFoundException(`Product not found in cart`)
        };

        return cartProduct;
    }

    async createCartProductInCart(
        insertCart: InsertCartDto,
        cartId: number
    ): Promise<CartProductEntity> {
        return this.cartProductRepository.save({
            amount: insertCart.amount,
            productId: insertCart.productId,
            cartId,
        });
    }

    async insertProductInCart(
        insertCart: InsertCartDto,
        cart: CartEntity
    ): Promise<CartProductEntity> {
        await this.productService.findProductById(insertCart.productId);

        const cartProduct = await this.verifyProductInCart(insertCart.productId, cart.id).catch(() => undefined);

        if (!cartProduct) {
            return this.createCartProductInCart(insertCart, cart.id)
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: cartProduct.amount + insertCart.amount
        })
    }
    
    async updateProductInCart(
        updateCartDto: UpdateCartDto,
        cart: CartEntity
    ): Promise<CartProductEntity> {
        await this.productService.findProductById(updateCartDto.productId);

        const cartProduct = await this.verifyProductInCart(
            updateCartDto.productId,
            cart.id
        );

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: updateCartDto.amount
        })
    }

    async deleteProductCart(
        productId: number,
        cartId: number
    ): Promise<DeleteResult> {
        return this.cartProductRepository.delete({
            productId,
            cartId
        })
    }
}
