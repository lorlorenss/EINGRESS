import { Body, Controller, Get, Param, Post , Delete, Put, NotFoundException, BadRequestException } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.interface';
import { Observable, catchError, map } from 'rxjs';

@Controller('employee')
export class EmployeeController {
    constructor(private userService: EmployeeService) {}

    @Post()
    create(@Body() employee: Employee): Observable<Employee | Object> {
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
    
}
