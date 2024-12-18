import { CartEntity } from "../entity/cart.entity";
import { ReturnCartProductDto } from "../../cart-product/dtos/return-cart-product.dto";

export class ReturnCartDto {
    id: number;
    cartProduct?: ReturnCartProductDto[];

    constructor(cart: CartEntity) {
        this.id = cart.id,
        this.cartProduct = cart.cartProduct
            ? cart.cartProduct.map(
                    (cartProduct) => new ReturnCartProductDto(cartProduct),
                )
            : undefined;
    }
}