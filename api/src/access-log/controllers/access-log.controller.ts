import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { AccessLogService } from '../services/access-log.service';
import { _dbaccesslog } from './../../access-log/models/access-log.entity'; // Adjust the import path if necessary

@Controller('access-log')
export class AccessLogController {
  constructor(private readonly accessLogService: AccessLogService) {}

  @Get()
  findAll(): Promise<_dbaccesslog[]> {
    return this.accessLogService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<_dbaccesslog> {
    return this.accessLogService.findById(id)
      .then(accessLog => {
        if (!accessLog) {
          throw new NotFoundException(`Access log with ID ${id} not found`);
        }
        return accessLog;
      });
  }

  @Post()
  create(@Body() accessLogData: Partial<_dbaccesslog>): Promise<_dbaccesslog> {
    return this.accessLogService.create(accessLogData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() accessLogData: Partial<_dbaccesslog>): Promise<_dbaccesslog> {
    return this.accessLogService.update(id, accessLogData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.accessLogService.delete(id);
  }
}
