import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { _dbemployee } from './models/employee.entity';
import { _dbaccesslog } from 'src/access-log/models/access-log.entity'; // Corrected import path
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([_dbemployee, _dbaccesslog]), // Include _dbAccessLog repository
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeListModule {}
