import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account } from '../../models/account.model';



@Component({
  selector: 'jamv-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = [];
  public dataSource: Account[] = [];
  private _unsubscribe$ = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.loadHeaders();
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    //  Destroy the Subscriptions to the services
    this._unsubscribe$.next(true);
    this._unsubscribe$.unsubscribe();
  }

  /**
   * Method to generate the headers of the table
   */
  private loadHeaders(): string[] {
    return ['name', 'cathegory', 'tags', 'balance', 'aviableBalance'];
  }

  /**
   * Method to load the accounts (mock-data)
   */
  private loadAccounts(): void {
    this.dataSource = [
      {
        id: 1,
        name: 'Name 1',
        category: 'Category 1',
        tags: 'Tag1',
        balance: 1,
        aviableBalance: 0.5
      },
      {
        id: 2,
        name: 'Name 2',
        category: 'Category 1',
        tags: 'Tag1',
        balance: 1,
        aviableBalance: 0.5
      },
      {
        id: 3,
        name: 'Name 3',
        category: 'Category 1',
        tags: 'Tag1',
        balance: 1.001,
        aviableBalance: 0.7005
      },
      {
        id: 4,
        name: 'Name 4',
        category: 'Category 3',
        tags: 'Tag3',
        balance: 1,
        aviableBalance: 0.505
      },
      {
        id: 5,
        name: 'Name 5',
        category: 'Category 1',
        tags: 'Tag3',
        balance: 1.2,
        aviableBalance: 0.95
      },
      {
        id: 6,
        name: 'Name 6',
        category: 'Category 2',
        tags: 'Tag3',
        balance: 1,
        aviableBalance: 0.5
      },
      {
        id: 7,
        name: 'Name 7',
        category: 'Category 1',
        tags: 'Tag1',
        balance: 1,
        aviableBalance: 0.5
      },
      {
        id: 8,
        name: 'Name 8',
        category: 'Category 1',
        tags: 'Tag1',
        balance: 0.8,
        aviableBalance: 0.5
      },
      {
        id: 9,
        name: 'Name 9',
        category: 'Category 2',
        tags: 'Tag1',
        balance: 1.1,
        aviableBalance: 1
      },
      {
        id: 10,
        name: 'Name 10',
        category: 'Category 1',
        tags: 'Tag1',
        balance: 0.002,
        aviableBalance: 0.00005
      },
      {
        id: 11,
        name: 'Name 11',
        category: 'Category 1',
        tags: 'Tag1',
        balance: 1.2,
        aviableBalance: 0.5
      },
      {
        id: 12,
        name: 'Name 12',
        category: 'Category 3',
        tags: 'Tag2',
        balance: 0.75,
        aviableBalance: 0.5
      },
      {
        id: 13,
        name: 'Name 13',
        category: 'Category 2',
        tags: 'Tag1',
        balance: 8,
        aviableBalance: 2
      },
      {
        id: 14,
        name: 'Name 14',
        category: 'Category 2',
        tags: 'Tag3',
        balance: 1,
        aviableBalance: 0.5
      },
      {
        id: 15,
        name: 'Name 15',
        category: 'Category 3',
        tags: 'Tag1, Tag2',
        balance: 2,
        aviableBalance: 0.7
      }
    ];
  }

}
