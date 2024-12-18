import { CityEntity } from "../../city/entity/city.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'address' })
export class AddressEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'complement' })
    complement: string;
    
    @Column({ name: 'number', nullable: false })
    numberAddress: number;
    
    @Column({ name: 'cep', nullable: false })
    cep: string;
    
    @Column({ name: 'city_id', nullable: false })
    cityId: number
    
    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.address)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;
    
    @ManyToOne(() => CityEntity, (city) => city.addresses)
    @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
    city?: CityEntity;
}