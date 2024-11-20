import { config } from 'dotenv';
import { Liquibase, LiquibaseConfig, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase';

// Load environment variables from env/local.env
const result = config({ path: './env/local.env' });

if (result.error) {
  throw new Error("Failed to load environment variables from env/local.env");
}

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env;

if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_NAME || !DATABASE_USER || !DATABASE_PASSWORD) {
  throw new Error("Missing required environment variables for database configuration");
}

const myConfig: LiquibaseConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './liquibase-scripts.json',
  url: `jdbc:postgresql://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
};

export const instance = new Liquibase(myConfig);
