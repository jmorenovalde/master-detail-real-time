import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppGateway } from './app.gateway';

import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    AccountsModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    AppGateway,
  ],
})
export class AppModule {}
