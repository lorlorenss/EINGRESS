import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/user';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const getUserUrl = `${this.apiUrl}/current-user}`;
    return this.http.get<any>(getUserUrl);
  }

  addUser(user: User): Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl, user);
  }

  loginUser(loginform: User): Observable<any> { 
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, {username: loginform.username, password:loginform.password});
  }

  logoutUser(){
    localStorage.removeItem('token');
  }
}
