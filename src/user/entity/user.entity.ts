import { AddressEntity } from "../../address/entity/address.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: false })
    email: string;
    
    @Column({ name: 'phone' })
    phone: string;
    
    @Column({ name: 'cpf', nullable: false })
    cpf: string;
    
    @Column({ name: 'password', nullable: false })
    password: string
    
    @Column({ name: 'type_user', nullable: false })
    typeUser: number
    
    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.user)
    address?: AddressEntity[]
}