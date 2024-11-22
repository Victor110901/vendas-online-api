import { Injectable, NotFoundException } from '@nestjs/common';
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

    async createCategory(
        createCategory: CreateCategoryDto
    ): Promise<CategoryEntity> {
        return this.categoryRepository.save(createCategory);
    }
}
