import { Test, TestingModule } from '@nestjs/testing';
import { DblogtotalService } from './log-total.service';

describe('LogTotalService', () => {
  let service: DblogtotalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DblogtotalService],
    }).compile();

    service = module.get<DblogtotalService>(DblogtotalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
