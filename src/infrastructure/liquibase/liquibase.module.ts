require('dotenv').config();
import {
  LiquibaseConfig,
  Liquibase,
  POSTGRESQL_DEFAULT_CONFIG,
} from 'liquibase';

const myConfig: LiquibaseConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './liquibase-scripts.json',
  url: `jdbc:postgresql://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

export const instance = new Liquibase(myConfig);
