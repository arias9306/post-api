import { Module } from '@nestjs/common';
import { databaseProviders } from './config/typeorm.datasource';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
