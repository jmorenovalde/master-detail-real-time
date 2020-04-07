import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccountsService } from './accounts.service';
import { BASE_PATH } from '../configs/variables';
import { Configuration, ConfigurationParameters } from '../configs/configuration';

export function configurationFake(): Configuration {
  const configParam: ConfigurationParameters = {
    basePath: '/APP_URL/api/v1',
    baseUrl: 'otherBaseUrl'
  };
  return new Configuration(configParam);
}

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountsService]
    });
    service = TestBed.inject(AccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('if not config basePath get de default basePath', () => {
    // tslint:disable-next-line: no-string-literal
    expect(service['basePath']).toEqual('http://localhost:9090');
  });

  describe('getBaseUrl', () => {
    it('if not config getBaseUrl get de default basePath', () => {
      expect(service.getBaseUrl()).toEqual('accounts');
    });
  });

  describe('getAccounts', () => {
    service.getAccounts();
  });
});

describe('AccountService with BASE_PATH', () => {
  let service: AccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountsService,
        {
          provide: BASE_PATH,
          useValue: '/ACCOUNT_SERVER/api/v1'
        }
      ]
    });
    service = TestBed.inject(AccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('if not config basePath get de default basePath', () => {
    // tslint:disable-next-line: no-string-literal
    expect(service['basePath']).toEqual('/ACCOUNT_SERVER/api/v1');
  });
});


describe('AccountService with CONFIGURATION', () => {
  let service: AccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountsService,
        {
          provide: Configuration,
          useValue: configurationFake()
        }
      ]
    });
    service = TestBed.inject(AccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get the value of basePath from ConfigurationFake', () => {
    // tslint:disable-next-line: no-string-literal
    expect(service['basePath']).toEqual('/APP_URL/api/v1');
  });

  it('Get the value of baseUrl from ConfigurationFake', () => {
    expect(service.getBaseUrl()).toEqual('otherBaseUrl');
  });
});
