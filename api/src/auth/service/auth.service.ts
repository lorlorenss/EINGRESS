import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/admin-login/models/user.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  comparePasswords(password: string, password1: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from(<string>bcrypt.hash(password, 12));
  }

  comparePassword(
    newPassword: string,
    passwordHash: string,
  ): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }

  // comparePassword(
  //   newPassword: string,
  //   passwordHash: string,
  // ): Observable<any | boolean> {
  //   const result = bcrypt.compareSync(newPassword, passwordHash);
  //   return of<any | boolean>(result);
  // }
  
  
}
