import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'sqlite',
  database: '../database.sqlite.sqlite',
  entities: ['src/entities/*.ts'],
  synchronize: true,
  logging: ['query', 'error'],
});

export default dataSource;
