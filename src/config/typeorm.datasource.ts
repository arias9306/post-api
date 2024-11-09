import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'oracle',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'post',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Solo en Development..
      });

      return dataSource.initialize();
    },
  },
];
