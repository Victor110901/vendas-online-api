import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entity/product.entity";

export const productMock:ProductEntity = {
    categoryId: categoryMock.id,
    createdAt: new Date(),
    id: 78546,
    image: 'http://image.com',
    name: 'Product Mock',
    price: 34.3,
    updatedAt: new Date(),
}