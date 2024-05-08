import { Test, TestingModule } from '@nestjs/testing';
import { DblogtotalController } from './log-total.controller';

describe('LogTotalController', () => {
  let controller: DblogtotalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DblogtotalController],
    }).compile();

    controller = module.get<DblogtotalController>(DblogtotalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
