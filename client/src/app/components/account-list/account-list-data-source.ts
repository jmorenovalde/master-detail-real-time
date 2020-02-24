import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Account } from '../../models/account.model';
import { AccountsService } from '../../http/accounts/accounts.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { takeUntil, catchError, finalize } from 'rxjs/operators';

export class AccountListDataSource implements DataSource<Account> {
  /**
   * @ignore subject to manage accounts$
   */
  private accountSubject = new BehaviorSubject<Account[]>([]);

  public accounts$ = this.accountSubject.asObservable();

  /**
   * @ignore private subject to manage loading$.
   */
  private loadingSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable to handle the loading accounts flag.
   */
  public loading$ = this.loadingSubject.asObservable();

  /**
   * @ignore private subject to manage length$.
   */
  private lengthSubject = new BehaviorSubject<number>(0);

  /**
   * Observable to handle the number of accounts.
   */
  public length$ = this.lengthSubject.asObservable();

  /**
   * @ignore the subject to unsubscribe subscriptions
   */
  private unsubscribe$ = new Subject<boolean>();

  constructor(private accountsService: AccountsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Account[]> {
    return this.accountSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.accountSubject.complete();
    this.accountSubject.complete();
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  public loadAccounts(): void {
    this.loadingSubject.next(true);
    this.accountsService.getAccounts()
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        (accounts: Account[]) => {
          this.accountSubject.next(accounts);
          this.lengthSubject.next(accounts.length);
        }
      );
  }
}
