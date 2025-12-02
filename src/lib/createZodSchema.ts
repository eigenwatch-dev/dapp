/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputField, InputFieldType } from "@/components/shared/ReusableForm";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export function createZodSchema(fields: InputField[]) {
  let zodObject: Record<string, any> = {};

  fields.forEach((field) => {
    // If field should be skipped
    if (field.excludeFromSchema) return;

    // Custom validation provided
    if (field.customZodValidation) {
      zodObject = {
        ...zodObject,
        ...field.customZodValidation(),
      };
      return;
    }

    // Flatten grid inputs directly
    if (field.type === InputFieldType.grid && field.grid?.length) {
      field.grid.forEach((gridInput) => {
        if (gridInput.excludeFromSchema) return;

        if (gridInput.customZodValidation) {
          zodObject = {
            ...zodObject,
            ...gridInput.customZodValidation(),
          };
        } else {
          zodObject = {
            ...zodObject,
            [gridInput.name]: generateValidation(gridInput.type),
          };
        }
      });
      return; // ✅ stop here so we don't also add the wrapper name
    }

    // Regular non-grid field
    zodObject = {
      ...zodObject,
      [field.name]: generateValidation(field.type),
    };
  });

  const formSchema = z
    .object(zodObject)
    .refine(
      (data) => {
        // If the data contains both password and confirm password validate that they are equal
        if (data?.password && data?.confirmPassword)
          return data.password === data.confirmPassword;
        return true;
      },
      {
        path: ["confirmPassword"], // mark only confirmPassword as invalid
        message: "Passwords do not match",
      }
    )
    .refine(
      (data) => {
        if (!data?.phoneNumber) return true;
        const phone = data.phoneNumber || "";
        try {
          const parsed = parsePhoneNumberFromString(String(phone));
          // valid if parsed and actually passes validation
          return parsed?.isValid() ?? false;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid phone number format",
        path: ["phoneNumber"],
      }
    );
  return formSchema;
}

export function generateValidation(
  inputType: InputFieldType,
  options?: { errorMsg?: string; skipValidation?: boolean }
) {
  const { errorMsg, skipValidation } = options || {};
  let validation: z.ZodTypeAny | null = null;

  if (skipValidation)
    return inputType === InputFieldType.number
      ? z.number().optional()
      : z.string().optional();

  switch (inputType) {
    case InputFieldType.text:
    case InputFieldType.textArea:
      validation = z.string().min(1, errorMsg);
      break;

    case InputFieldType.number:
      validation = z.number(errorMsg);
      break;

    case InputFieldType.phoneNumber:
      validation = z.string().min(1, errorMsg);
      break;

    case InputFieldType.password:
      validation = z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      break;

    case InputFieldType.email:
      validation = z.email(errorMsg);
      break;

    case InputFieldType.url:
      validation = z.httpUrl(errorMsg);
      break;

    case InputFieldType.date:
      validation = z.iso.date(errorMsg);
      break;

    case InputFieldType.checkBox:
      validation = z.boolean().optional();
      break;

    default:
      validation = z.string().optional();
      break;
  }

  return validation;
}

/**
 * Generates an object of default values from a Zod object schema.
 * - Uses ._def.defaultValue() when available.
 * - Falls back to a type-based default (e.g. "" for string, 0 for number).
 */
export function generateDefaultValues<T extends z.ZodTypeAny>(
  schema: T
): z.infer<T> {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const defaults: Record<string, any> = {};

    for (const key in shape) {
      const field = shape[key];

      // Get explicit default if present
      const hasDefault = (field as any)._def?.defaultValue !== undefined;
      if (hasDefault) {
        defaults[key] = (field as any)._def.defaultValue();
        continue;
      }

      // Handle nested objects recursively
      if (field instanceof z.ZodObject) {
        defaults[key] = generateDefaultValues(field);
        continue;
      }

      // Fallbacks based on type
      if (field instanceof z.ZodString) defaults[key] = "";
      else if (field instanceof z.ZodNumber) defaults[key] = 0;
      else if (field instanceof z.ZodBoolean) defaults[key] = false;
      else if (field instanceof z.ZodArray) defaults[key] = [];
      else defaults[key] = undefined;
    }

    return defaults as z.infer<T>;
  }

  throw new Error("generateDefaultValues: schema must be a Zod object");
}
