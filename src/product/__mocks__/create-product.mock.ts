import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dtos/create-product.dto copy";
import { ProductEntity } from "../entity/product.entity";

export const createProductMock: CreateProductDto = {
    categoryId: categoryMock.id,
    image: 'http://image.com',
    name: 'Product Mock',
    price: 25,
}