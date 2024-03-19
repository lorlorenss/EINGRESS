import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    const getUserUrl = `${this.apiUrl}/current-user}`;
    return this.http.get<User[]>(getUserUrl);
  }

  addUser(user: User): Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl, user);
  }

  loginUser(credentials: {username: string, password: string}): Observable<any> { 
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, credentials);
  }

  logoutUser(){
    localStorage.removeItem('token');
  }
}
