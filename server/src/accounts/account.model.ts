import { Statement } from './statement.model';

export interface Account {
  /**
   * Account ID
   */
  id?: number;

  /**
   * Account name.
   */
  name?: string;

  /**
   * Account category.
   */
  category?: string;

  /**
   * Account tags.
   */
  tags?: string;

  /**
   * Account balance, in Bitcoins.
   */
  balance?: number;

  /**
   * Account aviable balance, in Bitcoins.
   */
  aviableBalance?: number;

  /**
   * Account statements.
   */
  statements?: Statement[];
}
