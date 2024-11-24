import { ISeller, ITransaction } from "./transactionsWithConnectionType";

export type TRemainder = {
  _id: string;
  amount: number;
  seller: ISeller;
  customerNumber: string;
  remainder: boolean;
};

export type TNotification = ITransaction | TRemainder;
