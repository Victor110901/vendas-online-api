import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryEntity } from './entity/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        return (await this.categoryService.findAllCategories()).map(
            (category) => new ReturnCategoryDto(category),
        );
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(
        @Body() createCategory: CreateCategoryDto
    ): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategory);
    }

}
