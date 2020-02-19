export interface Account {
  /**
   * Id of the Account. PK
   */
  id: number;

  /**
   * Name of the account.
   */
  name: string;

  /**
   * Category of the account.
   */
  category: string;

  /**
   * Tags of the account.
   */
  tags: string;

  /**
   * Balance of the account, in Bitcoins.
   */
  balance: number;

  /**
   * Aviable balance of the account, in Bitcoins.
   */
  aviableBalance: number;
}
