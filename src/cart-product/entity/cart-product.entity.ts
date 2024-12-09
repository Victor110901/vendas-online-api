import { CartEntity } from "src/cart/entity/cart.entity";
import { ProductEntity } from "src/product/entity/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cart-product' })
export class CartProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'cart_id', nullable: false  })
    cartId: number;

    @Column({ name: 'product_id', nullable: false })
    productId: number;
    
    @Column({ name: 'amount', nullable: false })
    amount: number;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @ManyToOne(
        () => ProductEntity,
        (productEntity:ProductEntity) => productEntity.cartProduct
    )

    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product?: ProductEntity;

    @ManyToOne(() => CartEntity, (cartEntity) => cartEntity.cartProduct)

    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart?: CartEntity;
}