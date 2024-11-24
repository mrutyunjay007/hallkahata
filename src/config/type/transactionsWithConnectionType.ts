export interface ISeller {
  _id: string;
  userName: string;
  phoneNumber: string;
}
export interface ICustomer {
  _id: string;
  userName: string;
  phoneNumber: string;
}

interface IConnection {
  _id: string;
  seller: ISeller;
  customer: ICustomer;
  amount: number;
}

export interface ITransaction {
  _id: string;
  amount: number;
  seller: ISeller;
  customer: ICustomer;
  createdAt: string;
  paid: boolean;
  paymentType: string;
  aprooved: boolean;
  createdBy: string;
  cancelled: boolean;
}

export default interface ITanctionWithConnection {
  connection: IConnection;
  transectionHistory: ITransaction[];
}
