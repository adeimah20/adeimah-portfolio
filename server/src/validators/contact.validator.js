import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not exceed 100 characters.")
    .trim(),
  
  email: z.string()
    .email("Invalid email address format.")
    .trim()
    .toLowerCase(),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must not exceed 2000 characters.")
    .trim()
});

export const validateContact = (req, res, next) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    const errorDetails = result.error.issues.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errorDetails
    });
  }
  req.body = result.data;
  next();
};
