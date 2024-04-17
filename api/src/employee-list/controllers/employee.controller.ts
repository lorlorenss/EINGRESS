import { Body, Controller, Get, Param, Post , Delete, Put, UseInterceptors, UploadedFile, NotFoundException, Res} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.interface';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {v4 as uuid4} from 'uuid';
import { Response } from 'express';
import * as path from 'path';
import { join } from 'path';


export const storage = {
  storage: diskStorage ({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g,'')+uuid4();
      const extenstion: string =path.parse(file.originalname).ext;

      cb(null, `${filename}${extenstion}`)
    }
  })

  
}
@Controller('employee')
export class EmployeeController {
    constructor(private userService: EmployeeService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', storage))
    create(@Body() employee: Employee, @UploadedFile() file: Express.Multer.File): Observable<Employee | Object> {
        return this.userService.create(employee, file);
    }

    @Get(':id') // Route for findOne
    findOne(@Param() params): Observable<Employee> {
      return this.userService.findOne(params.id);
    }

    
    @Get() // Custom route name for findAll
    findAll(): Observable<Employee[]> {
      return this.userService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
      return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() employee: Employee): Observable<any> {
      return this.userService.updateOne(Number(id), employee);
    }

    @Post(':id/upload') // Route for uploading photo for specific employee
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file, @Param('id') id: string): Observable<Object> {
      const employeeId: number = parseInt(id, 10);
  
      // Fetch the employee by ID
      return this.userService.findOne(employeeId).pipe(
        switchMap(employee => {
          // Check if employee with given ID exists
          if (!employee) {
            throw new NotFoundException(`Employee with ID ${employeeId} not found`);
          }
  
          // Update employee's profile image
          return this.userService.updateOne(employeeId, {
            profileImage: file.filename,
            regdate: '',
            lastlogdate: ''
          }).pipe(
            map(updatedEmployee => ({ imagePath: file.filename }))
          );
        })
      );
    }


    @Get('profile-images/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object>{
      return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/'+imagename)))
    }

    // @Get(':id/profile')
    // findProfileImage(@Param('id') id, @Res() res): Observable<Object> {
    //   const employeeId: number = parseInt(id, 10);
    //   return this.userService.findOne(employeeId).pipe(
    //     switchMap(employee => {
    //       if (!employee) {
    //         throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    //       }
    //       if (!employee.profileImage) {
    //         throw new NotFoundException(`Profile image not found for employee with ID ${employeeId}`);
    //       }
    //       const imagePath = path.join(process.cwd(), 'uploads/profileimages' + employee.profileImage);
    //       // Here you can return both the employee details and the image file path
    //       console.log(employee)
    //       return of({ imagePath });
    //     }),
    //     catchError(error => {
    //       throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    //     })
    //   );
    // }
   


  }
