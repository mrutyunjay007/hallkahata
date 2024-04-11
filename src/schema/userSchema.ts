import { z } from "zod";

export const userFullName = z
  .string()
  .min(3, "User name must be at least 3 characters");

export const userPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Password must contain at least one letter, one number, and one special character"
  );

export const userPhoneNumber = z
  .string()
  .regex(/^\d{10}$/, "Phone number must be numeric and 10 digits");
