import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length === 0) {
            throw new NotFoundException('Categories empty');
        }

        return categories;
    }

    async findCategoryById(categoryId: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId,
            }
        });

        if (!category) {
            throw new NotFoundException(`Category id ${categoryId} not found`)
        }

        return category;
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name,
            }
        });

        if (!category) {
            throw new NotFoundException(`Category name ${name} not found`)
        }

        return category;
    }

    async createCategory(
        createCategory: CreateCategoryDto
    ): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(createCategory.name).catch(
            () => undefined
        );

        if (category) {
            throw new BadRequestException(`Category name ${createCategory.name} exist`)
        }

        return this.categoryRepository.save(createCategory);
    }
}
