import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { UserModule } from 'src/user/user.module';
import { CityService } from 'src/city/city.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), UserModule, CityService],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
