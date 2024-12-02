import { categoryMock } from "../../category/__mocks__/category.mock";
import { UpdateProductDTO } from "../dtos/update-product.dto";

export const updateProductMock: UpdateProductDTO = {
    categoryId: categoryMock.id,
    image: 'http://imageas.com',
    name: 'Product Mock Atualizado',
    price: 255,
}