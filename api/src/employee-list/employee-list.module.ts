import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { _dbemployee } from './models/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([_dbemployee]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeListModule {}
