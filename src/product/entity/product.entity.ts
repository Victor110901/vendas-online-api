import { CartProductEntity } from "../../cart-product/entity/cart-product.entity";
import { CategoryEntity } from "../../category/entity/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false  })
    name: string;

    @Column({ name: 'category_id', nullable: false })
    categoryId: number;
    
    @Column({ name: 'price', nullable: false })
    price: number;
    
    @Column({ name: 'image', nullable: false })
    image: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.product)
    cartProduct?: CartProductEntity[];

    @ManyToOne(
        () => CategoryEntity,
        (category: CategoryEntity) => category.products,
    )
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category?: CategoryEntity
}