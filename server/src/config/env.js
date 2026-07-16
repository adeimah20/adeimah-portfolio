import dotenv from 'dotenv';

// Memuat variabel lingkungan dari file .env
dotenv.config();

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  TO_EMAIL: process.env.TO_EMAIL,
  FROM_EMAIL: process.env.FROM_EMAIL || 'onboarding@resend.dev',
};
