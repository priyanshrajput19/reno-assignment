import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000, // Default port is 4000
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Default user is root
    password: process.env.DB_PASSWORD, // Default password is empty
    database: process.env.DB_NAME, // Default database is empty
  },
};
