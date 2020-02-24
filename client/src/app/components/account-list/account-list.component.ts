import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountsService } from '../../http/accounts/accounts.service';

import { AccountListDataSource } from './account-list-data-source';

import { WebsocketService } from '../../shared/services/websocket/websocket.service';

@Component({
  selector: 'jamv-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  animations: [
    trigger('aniRow', [
      state('normal', style({
         background: '#ffffff'
      })),
      state('upgrade',
        style({
          background: '#ffffff'
        })
      ),
      state('downgrade', style({
        background: '#ffffff'
      })),
      transition('* => upgrade', [
        animate('500ms', keyframes([
          style({ background: 'linear-gradient(to right, #00ff00, #ffffff)' }),
          style({ backgroundColor: 'white' })
        ]))
      ]),
      transition('upgrade => normal', animate('500ms ease-in')),
      transition('* => downgrade', animate('500ms ease-out', keyframes([
        style({ background: 'linear-gradient(to right, #ff0000, #ffffff)' }),
        style({ backgroundColor: 'white' })
      ]))),
      transition('downgrade => normal', animate('500ms ease-in'))
    ])
  ]
})
export class AccountListComponent implements OnInit, OnDestroy {

  /**
   * Variable to make the convert from bitcoin to dollar. The variable is provided by the WebSocketService
   * with new-rate message.
   */
  public rate = 0;

  /**
   * State for the animations.
   */
  public state = 'normal';

  /**
   * The columns of the table.
   */
  public displayedColumns = this.loadHeaders();

  /**
   * Content to show in the table.
   */
  public dataSource: AccountListDataSource;

  /**
   * @ignore The unsubscribe variable to safe of memory leaks.
   */
  private unsubscribe$ = new Subject<boolean>();

  constructor(private accountsService: AccountsService,
              private router: Router,
              private websocketService: WebsocketService) { }

  /**
   * the init cycle hook.
   */
  ngOnInit(): void {
    this.dataSource = new AccountListDataSource(this.accountsService);
    this.dataSource.loadAccounts();
    // Get exchange rate from socket
    this.websocketService.listen('new-rate')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (message: unknown) => {
          if (Number.parseFloat(message.toString())) {
            const rateOld = this.rate;
            this.rate = Number.parseFloat(message.toString());
            if (rateOld > this.rate) {
              this.state = 'downgrade';
            } else if (rateOld < this.rate) {
              this.state = 'upgrade';
            } else {
              this.state = 'normal';
            }
          }
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
        'name',
        'cathegory',
        'tags',
        'balance',
        'aviableBalance'
      ];
  }

  public onClickRow(row) {
    console.log(row);
    this.router.navigate(['/accounts', row.id]);
  }
}
