import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { _dblogstotal } from '../models/logs-total.entity';
import { _dbaccesslog } from 'src/access-log/models/access-log.entity';
import { LoginTotalService } from '../services/login-total.service';
import { totalLogs } from '../models/logs-total.interface';
import { Observable } from 'rxjs';

@Controller('total-logs')
export class LoginTotalController {
  constructor(private readonly totalLogsService: LoginTotalService) {}
    
      @Post()
      create(@Body() accessLogData: totalLogs): Observable<totalLogs> {
        // Since create returns a plain entity, no need for await
      return this.totalLogsService.create(accessLogData);
      }

      @Get(':id')
      findOne(@Param()params):Observable<totalLogs> {
        return this.totalLogsService.findOne(params.id)
      }

      @Get(':id')
      findAll():Observable<totalLogs[]> {
        return this.totalLogsService.findAll()
      }

      @Delete(':id')
      deleteOne(@Param('id')id:string):Observable<totalLogs> {
        return this.totalLogsService.deleteOne(Number(id))
      }
      @Put(':id')
      updateOne(@Param('id')id:string, @Body() accessLogData: totalLogs):Observable<any> {
        return this.totalLogsService.updateOne(Number(id),accessLogData)
      }
}
