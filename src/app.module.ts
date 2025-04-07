// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostModule } from './host/zombie.module';
import { join } from 'path';

@Module({
  imports: [
    // Loads environment variables from .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Register TypeORM
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE === 'postgres' ? 'postgres' : 'better-sqlite3',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      // For SQLite specifically
      // e.g. if DB_TYPE=sqlite => database: 'punisherC2.sqlite'
      // and ignore host/port/username/password

      // This is where TypeORM looks for entities
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,  // automatically create tables from entities (not recommended in production)
    }),

    HostModule, // your module with controllers and services
  ],
})
export class AppModule {}
