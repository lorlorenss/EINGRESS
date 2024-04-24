import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { AccessLog } from '../interface/access-log.interface';

@Injectable({
  providedIn: 'root'
})
export class AccessLogService {

  private apiUrl = '/api/access-log';

  constructor(private http: HttpClient) { }

  getAccessLogs(): Observable<AccessLog[]> {
    const getAccessLogsUrl = `${this.apiUrl}`;
    return this.http.get<AccessLog[]>(getAccessLogsUrl);
  }

  getAccessLogsByEmployeeId(employeeId: number): Observable<AccessLog[]> {
    const getAccessLogsByEmployeeIdUrl = `${this.apiUrl}/employee/${employeeId}`;
    return this.http.get<AccessLog[]>(getAccessLogsByEmployeeIdUrl)
      .pipe(
        tap(data => console.log('Fetched access logs:', data)),
        catchError(error => {
          console.error('Error fetching access logs:', error);
          throw error;
        })
      );
  }
  

  addAccessLog(accessLog: Omit<AccessLog, 'id'>): Observable<AccessLog> {
    return this.http.post<AccessLog>(this.apiUrl, accessLog);
  }

}
