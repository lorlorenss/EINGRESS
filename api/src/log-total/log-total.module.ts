
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DblogtotalService } from './services/log-total.service';
import { DblogtotalController } from './controllers/log-total.controller';
import { _dblogtotal } from './models/log-total.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([_dblogtotal]),
    AuthModule
  ],
  providers: [DblogtotalService],
  controllers: [DblogtotalController]
})
export class LogTotalModule {}