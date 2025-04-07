import { InterfaceInfo } from './interface-info.dto';

export class SystemData {
  uuid: string;
  hostname: string;
  os_type: string;
  os_version: string;
  interfaces: InterfaceInfo[];
  username: string;
  is_admin_user: boolean;
  is_admin_process: boolean;
  host_time: string;
}