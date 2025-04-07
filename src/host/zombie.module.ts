// src/host/host.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Host } from './entities/host.entity';
import { Command } from './entities/command.entity';
import { ZombieService } from './zombie.service'
import { ZombieController } from './zombie.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Host, Command]),
  ],
  controllers: [ZombieController],
  providers: [ZombieService],
})
export class HostModule {}
