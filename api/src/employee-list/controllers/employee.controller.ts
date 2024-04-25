import { Body, Controller, Get, Param, Post , Delete, Put, NotFoundException, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.interface';
import { Observable, catchError, map, of } from 'rxjs';
import {FileInterceptor} from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import {v4 as uuid4} from 'uuid';
import * as path from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req,file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g,'') + uuid4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`)
    }
  })
}

@Controller('employee')
export class EmployeeController {
    constructor(private userService: EmployeeService) {}

    // @Post()
    // create(@Body() employee: Employee): Observable<Employee | Object> {
    //     return this.userService.create(employee);
    // }
    @Post()
    @UseInterceptors(FileInterceptor('file', storage))
    create(@Body() employee: Employee, @UploadedFile() file): Observable<Employee | Object> {
      if (!file) {
        throw new BadRequestException('Image file is required');
      }
  
      // Assign the file path to the employee object
      employee.profileImage = file.path;
  
      // Call the service method to create the employee

  return this.userService.create(employee);
}


    @Get(':id') // Route for findOne
    findOne(@Param() params): Observable<Employee> {
      return this.userService.findOne(params.id);
    }

    @Get() // Custom route name for findAll
    findAll(): Observable<Employee[]> {
      return this.userService.findAll();
    }

    @Delete(':id') //this code will delete the user and its logs
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.userService.deleteEmployeeWithAccessLogs(Number(id)).pipe(
            catchError(error => {
                throw new NotFoundException('User not found');
            }),
            map(() => ({ message: 'User and associated access logs deleted successfully' }))
        );
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() employee: Employee): Observable<any> {
      return this.userService.updateOne(Number(id), employee);
    }

    @Post('log-access')
    logEmployeeAccess(@Body() accessData: { employeeId: number, accessType: string, roleAtAccess: string }): Promise<void> {
    const { employeeId, accessType, roleAtAccess } = accessData;

  if (!employeeId || !accessType || !roleAtAccess) {
    throw new BadRequestException('Invalid access data');
  }

  return this.userService.logEmployeeAccess(employeeId, accessType, roleAtAccess).toPromise();
  }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file',storage))
    uploadFile(@UploadedFile()file): Observable<Object> {
      console.log(file);
      return of({imagePath: file.path});

    }

    @Put(':id/rfid')
  updaterfidtag(@Param('id') id: string, @Body('rfidtag') rfidtag: string): Observable<Employee> {
    return this.userService.updaterfidtag(Number(id), rfidtag);
  }

  @Put(':id/fingerprint')
  updatefingerprint(@Param('id') id: string, @Body('fingerprint') fingerprint: string): Observable<Employee> {
    return this.userService.updatefingerprint(Number(id), fingerprint);
  }
    
}
