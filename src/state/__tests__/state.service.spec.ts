import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateService } from '../state.service';
import { StateEntity } from '../entity/state.entity';
import { stateMock } from '../__mocks__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateMock]),
          }
        }
      ],
      
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });
  
  it('should return list of state', async () => {
    const state = await service.getAllState();

    expect(state).toEqual([stateMock]);
  });
  
  it('should return erro in exception', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error())

    expect(service.getAllState()).rejects.toThrowError();
  });
});
