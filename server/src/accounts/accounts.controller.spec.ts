import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('Accounts Controller', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAccounts', () => {
    it('should return any accounts', () => {
      const result = [];
      jest.spyOn(service, 'getAccounts').mockImplementation(() => result);
      const accounts = service.getAccounts();
      expect(accounts).toBeTruthy();
      expect(accounts).toBe(result);
      expect(accounts).toHaveLength(0);
    });
  });
});
