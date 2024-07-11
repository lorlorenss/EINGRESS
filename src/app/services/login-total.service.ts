import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { totalLogs } from '../interface/logs-total.interface';
import { environment } from '../environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
  export class LoginTotalService {

    private apiUrl = `${environment.baseURL}api/total-logs`;

    constructor(private http: HttpClient) { }

    // Method to get today's login statistics
    getTodayLoginStatistics(): Observable<totalLogs> {
      return this.http.get<totalLogs>(`${this.apiUrl}/today`);
    }
  
    // Method to update today's login statistics
    updateTodayLoginStatistics(loginstoday: string, notlogin: string): Observable<any> {
      const loginData: totalLogs = { loginstoday, notlogin };
      return this.http.put(`${this.apiUrl}/today`, loginData);
    }

    // Method to create default entry
    createDefaultEntry(loginstoday: string, notlogin: string): Observable<any> {
        const loginData: totalLogs = { loginstoday, notlogin };
        return this.http.post(`${this.apiUrl}/default-entry`, loginData);
    }

     // Method to get all entries for the current month
    getLogsForCurrentMonth(): Observable<totalLogs[]> {
    return this.http.get<totalLogs[]>(`${this.apiUrl}/current-month`);
     }
  }