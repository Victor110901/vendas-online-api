import { AddressEntity } from "../../address/entity/address.entity";
import { StateEntity } from "../../state/entity/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'city' })
export class CityEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'state_id', nullable: false })
    stateId: number;

    @Column({ name: 'name', nullable: false  })
    name: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;
    
    @CreateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.city)
    addresses?: AddressEntity[]

    @ManyToOne(() => StateEntity, (state) => state.cities)
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    state?: StateEntity;
}