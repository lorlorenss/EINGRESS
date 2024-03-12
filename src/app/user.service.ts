import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { shareReplay } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.freeapi.app/api/v1/users/login';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl, user);
  }

  loginUser(credentials: {username: string, password: string}): Observable<any> { //An observable begins publishing values only when someone subscribes to it
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post<any>(loginUrl, credentials).pipe( //RxJs method pipe allows you to chain RxJS operators to process the observable stream
      tap((response: any) => { //RxJs method tap doesnt modify the emitted value but allows you to perform actions based on those values 
        if (response && response.data.accessToken){
          localStorage.setItem('token', response.data.accessToken);
        }
      })
    );
  }

  logoutUser(){
    localStorage.removeItem('token');
  }
}
