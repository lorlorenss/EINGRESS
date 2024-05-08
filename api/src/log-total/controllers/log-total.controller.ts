import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Logtotal } from '../models/log-total.interface';
import { Observable } from 'rxjs';
import { _dblogtotal } from '../models/log-total.entity';
import { DblogtotalService } from '../services/log-total.service';

@Controller('_dblogtotal')
export class DblogtotalController {
  constructor(private readonly dblogtotalService: DblogtotalService) {}

  // @Get()
  // findAll(): _dblogtotal[] {
  //   return this.dblogtotalService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): _dblogtotal {
  //   return this.dblogtotalService.findOne(+id);
  // }

  @Post()
  create(@Body() dblogtotal: Logtotal): Observable<_dblogtotal> {
    return this.dblogtotalService.create(dblogtotal);
  }
  
  // @Put(':id')
  // update(@Param('id') id: string, @Body() dblogtotal: Partial<_dblogtotal>): _dblogtotal {
  //   return this.dblogtotalService.update(+id, dblogtotal);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): void {
  //   this.dblogtotalService.remove(+id);
  // }
}
