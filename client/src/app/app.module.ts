import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AccountsService } from './http/accounts/accounts.service';
import { BASE_PATH } from './http/configs/variables';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AccountListModule } from './components/account-list/account-list.module';
import { AccountDetailModule } from './components/account-detail/account-detail.module';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AccountListModule,
    AccountDetailModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AccountsService,
    {
      provide: BASE_PATH,
      useValue: '/ACCOUNT_SERVER/api/v1'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
