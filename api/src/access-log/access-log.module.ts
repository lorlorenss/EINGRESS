import { Module } from '@nestjs/common';
import { AccessLogService } from './services/access-log.service';
import { AccessLogController } from './controllers/access-log.controller';
import { _dbaccesslog } from './models/access-log.entity'; // Assuming the entity file is named access-log.entity.ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([_dbaccesslog]), // Import the AccessLog entity
  ],
  providers: [AccessLogService],
  controllers: [AccessLogController]
})
export class AccessLogModule {}
