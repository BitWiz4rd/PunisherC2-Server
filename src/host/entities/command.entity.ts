// src/host/entities/command.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Host } from './host.entity';

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  command: string;

  @Column({ nullable: true })
  stdout: string;

  @Column({ nullable: true })
  stderr: string;

  @Column({ default: 'NO_EXEC' })
  result: string;

  @ManyToOne(() => Host, (host) => host.commands, { onDelete: 'CASCADE' })
  host: Host;
}
