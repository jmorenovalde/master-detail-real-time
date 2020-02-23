import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { AccountsService } from 'src/app/http/accounts/accounts.service';
import { WebsocketService } from 'src/app/shared/services/websocket/websocket.service';
import { takeUntil } from 'rxjs/operators';

import { Account } from '../../models/account.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jamv-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  /**
   * Variable to make the convert from bitcoin to dollar. The variable is provided by the WebSocketService
   * with new-rate message.
   */
  public rate = 0;

  /**
   * The detail of the account
   */
  public account: Account;

  /**
   * The columns of the table.
   */
  public displayedColumns = this.loadHeaders();

  /**
   * @ignore The unsubscribe variable to safe of memory leaks.
   */
  private unsubscribe$ = new Subject<boolean>();

  /**
   * Datasource for the table
   */
  public dataSource = new MatTableDataSource();

  /**
   * Constructor of the component
   * @param accountsService injection of the AccountService.
   * @param router injection of the Angular Router Service.
   * @param websocketService injection of the WebsocketService.
   */
  constructor(private accountsService: AccountsService,
              private route: ActivatedRoute,
              private router: Router,
              private websocketService: WebsocketService) { }

  /**
   * the init cycle hook.
   */
  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        if (params && params.id) {
          const accountId = params.id;
          this.accountsService.getAccount(accountId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              (account: Account) => {
                this.account = account;
                this.dataSource.data = account.statements;
              }
            );
        } else {
          this.goToHome();
        }
      });
    // Get exchange rate from socket
    this.websocketService.listen('new-rate')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (message: unknown) => {
          this.rate = this.processExchangeRate(message as number);
        }
      );
  }

  /**
   * Destoy cycle hook
   */
  ngOnDestroy(): void {
    //  Destroy the Subscriptions to the services
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  /**
   * Method to generate the headers of the table
   */
  private loadHeaders(): string[] {
    return [
        'date',
        'orderId',
        'orderCode',
        'type',
        'debit',
        'credit',
        'balance'
      ];
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  private processExchangeRate(value: number): number {
    if (!isNaN(value)) {
      return Number.parseFloat(value.toString());
    }
    return 0;
  }
}
