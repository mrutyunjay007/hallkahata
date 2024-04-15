import { z } from "zod";

export const amountOfBill = z
  .string()
  .regex(/^[1-9]\d*$/, "amount must be more than 0");
