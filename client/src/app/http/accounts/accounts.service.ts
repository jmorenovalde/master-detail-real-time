import { Injectable, Optional, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Configuration } from '../configs/configuration';
import { BASE_PATH, BASE_URL } from '../configs/variables';

import { Account } from '../../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  /**
   * API basepath
   */
  protected basePath = 'http://localhost:9090';

  /**
   * Service baseUrl
   */
  protected baseUrl = 'accounts';

  /**
   * Default Header.
   */
  public defaultHeaders = new HttpHeaders();

  /**
   * Default configuration.
   */
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient,
              @Optional() @Inject(BASE_PATH) basePath: string,
              @Optional() @Inject(BASE_URL) baseUrl: string,
              @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
      this.baseUrl = baseUrl || configuration.baseUrl || this.baseUrl;
    }
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Service to get the accounts from the server.
   * @param observe set whether or not to return the data Observable as the body, response or events. Defaults
   * to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAccounts(observe?: 'body', reportProgress?: boolean): Observable<Array<Account>>;
  public getAccounts(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Account>>>;
  public getAccounts(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Account>>>;
  public getAccounts(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }
    return this.httpClient.get<Account[]>(`${this.basePath}/${this.baseUrl}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress
    });
  }

  /**
   * Get an Account.
   * This method return the Account of this ID.
   * @param id Identify of the Account.
   * @param observe set whether or not to return the data Observable as the body, response or events. Defaults
   * to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAccount(id: string, observe?: 'body', reportProgress?: boolean): Observable<Account>;
  public getAccount(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Account>>;
  public getAccount(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Account>>;
  public getAccount(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getAccount.');
    }
    let headers = this.defaultHeaders;
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }
    return this.httpClient.get<Account>(
      `${this.basePath}/${this.baseUrl}/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }
}
