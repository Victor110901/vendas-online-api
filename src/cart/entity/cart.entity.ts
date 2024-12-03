import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";

export class CartEntity {
    @PrimaryColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number
    
    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;
}