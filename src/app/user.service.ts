import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { shareReplay } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/user/login';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl, user);
  }

  loginUser(username: string, password: string): Observable<any> { //An observable begins publishing values only when someone subscribes to it
    const loginUrl = `${this.apiUrl}`;

    return this.http.post<any>(loginUrl, {username,password}).pipe( //RxJs method pipe allows you to chain RxJS operators to process the observable stream
      map((response: any) => { //RxJs method tap doesnt modify the emitted value but allows you to perform actions based on those values 
        if (response && response.token){
          localStorage.setItem('token', response.access_token);
          return response;
        }
      })
    );
  }

  // loginUser(username: string, password: string): Observable<any> { //An observable begins publishing values only when someone subscribes to it
  //   const loginUrl = `${this.apiUrl}`;

  //   return this.http.post<any>(loginUrl, {username,password}).pipe( //RxJs method pipe allows you to chain RxJS operators to process the observable stream
  //     map((token) => { //RxJs method tap doesnt modify the emitted value but allows you to perform actions based on those values        
  //         console.log(token);
  //         localStorage.setItem('token', token.access_token);
  //         return token;
        
  //     })
  //   );
  // }


  logoutUser(){
    localStorage.removeItem('token');
  }
}
