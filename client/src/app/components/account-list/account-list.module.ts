import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountListComponent } from './account-list.component';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountListComponent
  ],
  exports: [
    AccountListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule.forChild()
  ]
})
export class AccountListModule { }
