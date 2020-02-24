export interface Statement {
  /**
   * The unique code of the statement.
   */
  orderId: string;

  /**
   * Order code.
   */
  orderCode: string;

  /**
   * Statement date.
   */
  date: Date;

  /**
   * Statement type.
   */
  type: string;

  /**
   * Statement credit.
   */
  credit: number;

  /**
   * Acount balance with the statement.
   */
  balance: number;
}
