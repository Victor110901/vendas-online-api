import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mock__/user.mock';
import { createUserMock } from '../__mock__/createUser.mock';
import { updatePasswordInvalidMock, updatePasswordMock } from '../__mock__/updateUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue({userEntityMock}),
            save: jest.fn().mockResolvedValue({userEntityMock}),
          }
        }
      ],
      
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });
  
  it('should return user in findUserByEmail', async () => {
    const user = service.findUserByEmail(userEntityMock.email);

    expect(userEntityMock).toEqual(userEntityMock);
  });
  
  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserByEmail(userEntityMock.email)
    ).rejects.toThrowError();
  });
  
  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findUserByEmail(userEntityMock.email)
    ).rejects.toThrowError();
  });
  
  it('should return user in findUserById', async () => {
    const user = service.findUserById(userEntityMock.id);

    expect(userEntityMock).toEqual(userEntityMock);
  });
  
  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserById(userEntityMock.id)
    ).rejects.toThrowError();
  });
   
  it('should return error in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findUserById(userEntityMock.id)
    ).rejects.toThrowError();
  });
    
  it('should return user in getUserByIdUsingRelations', async () => {
    const user = service.getUserByIdUsingRelations(userEntityMock.id);

    expect(userEntityMock).toEqual(userEntityMock);
  });
    
  it('should return error if user exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });
    
  it('should return user if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(userEntityMock).toEqual(userEntityMock);
  });
    
  // it('should return user in update password', async () => {
  //   const user = await service.updatePasswordUser(
  //     updatePasswordMock,
  //     userEntityMock.id
  //   );

  //   expect(user).toEqual(userEntityMock);
  // });
    
  it('should return invalid password in error', async () => {
    expect(
      service.updatePasswordUser(updatePasswordInvalidMock, userEntityMock.id),
    ).rejects.toThrowError();
  });
    
  it('should return error in user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updatePasswordUser(updatePasswordMock, userEntityMock.id),
    ).rejects.toThrowError();
  });
});
