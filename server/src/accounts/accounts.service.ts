import { Injectable, HttpException } from '@nestjs/common';

import { Account } from './account.model';

import { accountMockData } from '../mock-data/accounts';
import { Statement } from './statement.model';

import _ = require('lodash');

@Injectable()
export class AccountsService {
  private accounts: Account[] = [];

  constructor() {
    this.accounts = accountMockData;
    this.accounts.map((account: Account) => {
      account.statements = this.generateAcountStatementsMock(account);
      return account;
    });
  }

  private makeId(length) { 
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private generateAcountStatementsMock(account: Account): Statement[] {
    const random = Math.floor(Math.random() * 8) + 2;
    const statements: Statement[] = [];
    let balance = 0;
    const credit = account.balance / random;
    for (let i = 0; i < random; i++) {
      balance += credit;
      statements.push({
        orderId: this.makeId(5),
        orderCode: `CODE ${account.id} - ${i}`,
        type: 'PAYMENT',
        date: new Date(),
        credit,
        balance,
      });
    }
    return statements;
  }

  public getAccounts(): Account[] {
    // Delete the unusefull information for this method from mockData information.
    const accounts = _.cloneDeep(this.accounts);
    accounts.map((account: Account) => {
      delete account.statements;
      return account;
    });
    return this.accounts;
  }

  public getAccount(id: number): Account {
    if (!isNaN(id)) {
      const index = this.accounts.findIndex((account: Account) => account.id.toString() === id.toString());
      if (index >= 0) {
        return this.accounts[index];
      } else  {
        throw new HttpException('Account not found', 404);
      }
    } else {
      throw new HttpException('Bad request', 400);
    }
  }
}
