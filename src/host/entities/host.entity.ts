// src/host/entities/host.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Command } from './command.entity';

@Entity()
export class Host {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  hostname: string;

  @Column()
  os_type: string;

  @Column()
  os_version: string;

  @Column()
  username: string;

  @Column()
  is_admin_user: boolean;

  @Column()
  is_admin_process: boolean;

  @Column()
  host_time: string;

  @Column({ type: 'float' })
  last_seen: number;

  // Relationship: A host can have many commands
  @OneToMany(() => Command, (command) => command.host)
  commands: Command[];
}
