import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountListModule } from './components/account-list/account-list.module';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AccountListModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
