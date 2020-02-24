import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiProduces, ApiParam, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { AccountsService } from './accounts.service';
import { AccountDto } from './dto/account.dto';

@ApiTags('Accounts controller')
@Controller('accounts')
export class AccountsController {

  constructor(private accountsService: AccountsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get accounts from the system.',
    description: 'The endpoind provides all the accounts from the system.',
    operationId: 'getAccounts',
  })
  @ApiProduces('application/json')
  @ApiOkResponse({
    isArray: true,
    type: AccountDto,
    description: 'The accounts from the system.',
  })
  getAccounts(): AccountDto[] {
    return this.accountsService.getAccounts() as AccountDto[];
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get account with the ID from the system.',
    description: 'The endpoind provides the account with the ID from the system.',
    operationId: 'getAccount',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the account to get it.',
  })
  @ApiProduces('application/json')
  @ApiOkResponse({
    isArray: true,
    type: AccountDto,
    description: 'The account with the ID from the system.',
  })
  @ApiBadRequestResponse({
    isArray: false,
    description: 'Bad request for the ID param.',
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'Not found an account with this ID.',
  })
  getAccount(@Param() params): AccountDto {
    return this.accountsService.getAccount(params.id) as AccountDto;
  }
}
