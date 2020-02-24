import { ApiProperty } from '@nestjs/swagger';

import { StatementDto } from './statement.dto';

export class AccountDto {
  @ApiProperty({
    type: Number,
    format: 'int64',
    description: 'Account ID.',
    required: false,
  })
  id?: number;

  @ApiProperty({
    type: String,
    description: 'Account name.',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: 'Account cathegory.',
    required: false,
  })
  category?: string;

  @ApiProperty({
    type: String,
    description: 'Account tags.',
    required: false,
  })
  tags?: string;

  @ApiProperty({
    type: Number,
    format: 'double',
    description: 'Account balance.',
    required: false,
  })
  balance?: number;

  @ApiProperty({
    type: Number,
    format: 'double',
    description: 'Account aviable balance.',
    required: false,
  })
  aviableBalance?: number;

  @ApiProperty({
    type: StatementDto,
    isArray: true,
    description: 'Account statements.',
    required: false,
  })
  statements?: StatementDto[];
}
