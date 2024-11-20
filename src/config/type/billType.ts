import { ICustomer, ISeller } from "./transactionsWithConnectionType";

export default interface IBill {
  _id: string;
  seller: ISeller;
  customer: ICustomer;
  amount: number;
  refBillId: string;
  refCreatedAt: string;
  paid: boolean;
  createdAt: Date;
  connectionId: string;
}
