import { Test, TestingModule } from '@nestjs/testing';
import { AdministradorService } from './administrador.service';

describe('AdministradorService', () => {
  let service: AdministradorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministradorService],
    }).compile();

    service = module.get<AdministradorService>(AdministradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
