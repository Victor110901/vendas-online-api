import { productMock } from "../../product/__mocks__/product.mock";
import { UpdateCartDto } from "../dtos/update-cart.dto";

export const updateCartMock: UpdateCartDto = {
    amount: 564256,
    productId: productMock.id
}