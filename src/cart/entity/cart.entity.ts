import { CartProductEntity } from "src/cart-product/entity/cart-product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'cart' })
export class CartEntity {
    @PrimaryColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number
    
    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
    cartProduct?: CartProductEntity[];
}