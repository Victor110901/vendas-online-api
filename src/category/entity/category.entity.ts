import { ProductEntity } from "../../product/entity/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false  })
    name: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
    products?: ProductEntity
}