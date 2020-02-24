import { ApiProperty } from '@nestjs/swagger';

export class StatementDto {
  @ApiProperty({
    type: String,
    description: 'The unique code of the statement.',
    required: false,
  })
  orderId: string;

  @ApiProperty({
    type: String,
    description: 'Order code.',
    required: false,
  })
  orderCode: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Statement date.',
    required: false,
  })
  date: Date;

  @ApiProperty({
    type: String,
    description: 'Statement type.',
    required: false,
  })
  type: string;

  @ApiProperty({
    type: Number,
    format: 'double',
    description: 'Statement credit.',
    required: false,
  })
  credit: number;

  @ApiProperty({
    type: Number,
    format: 'double',
    description: 'Acount balance with the statement.',
    required: false,
  })
  balance: number;
}
