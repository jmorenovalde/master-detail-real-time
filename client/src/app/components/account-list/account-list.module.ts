import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { AccountListComponent } from './account-list.component';
import { ConvertPipe } from '../../shared/pipes/convert.pipe';

@NgModule({
  declarations: [
    AccountListComponent,
    ConvertPipe
  ],
  exports: [
    AccountListComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    TranslateModule.forChild()
  ]
})
export class AccountListModule { }
