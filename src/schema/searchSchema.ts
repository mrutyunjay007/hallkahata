import { z } from "zod";

export const searchResult = z
  .string()
  .regex(
    /^[A-Za-z][^0-9]*$|^[0-9][^A-Za-z]*$/,
    "user name must not contain digits and phone number must not contain alphabets"
  );
export const searchLetter = z.string().regex(/^[A-Za-z]*$/);

export const searchNumber = z
  .string()
  .regex(/^[0-9]{1,10}$/, "phone number must be in 10 digits");
