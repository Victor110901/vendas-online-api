import { stateMock } from "../../state/__mocks__/state.mock";
import { CityEntity } from "../entity/city.entity";

export const cityMock: CityEntity = {
    createdAt: new Date(),
    id: 423456,
    name: 'cityMock',
    stateId: stateMock.id,
    updatedAt: new Date(),
}