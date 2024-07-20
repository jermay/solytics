import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3Service } from './web3/web3.service';
import { TokenService } from './web3/token.service';
import { TpsService } from './web3/tps.service';
import { WalletService } from './web3/wallet.service';

jest.mock('./web3/web3.service');
jest.mock('./web3/token.service');
jest.mock('./web3/tps.service');
jest.mock('./web3/wallet.service');

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        Web3Service,
        TokenService,
        TpsService,
        WalletService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
