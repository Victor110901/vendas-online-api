import { CategoryEntity } from "../entity/category.entity";

export class ReturnCategoryDto {
    id: number;
    name: string;

    constructor(categoryEntity: CategoryEntity){
        this.id = categoryEntity.id,
        this.name = categoryEntity.name
    }
}