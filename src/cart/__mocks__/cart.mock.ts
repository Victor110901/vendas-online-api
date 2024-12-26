import { userEntityMock } from "../../user/__mock__/user.mock";
import { CartEntity } from "../entity/cart.entity";

export const cartMock: CartEntity = {
    active: true,
    createdAt: new Date(),
    id: 564132,
    updatedAt: new Date(),
    userId: userEntityMock.id,
}