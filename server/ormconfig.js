const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
  name: 'default',
  type: 'postgres',
  host: '0.0.0.0',
  port: '5432',
  username: 'user',
  password: 'password',
  database: 'note-tracker',
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.js,.ts}'],
});

module.exports = [dataSource];
