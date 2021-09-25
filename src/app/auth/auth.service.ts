import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface responseData {
  idToken	: string;
  email	: string;
  refreshToken : string;
  expiresIn	: string;
  localId	: string;
  registere?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  onSignup(user: User): Observable<responseData> {
    return this.http.post<responseData>(environment.signup, {
      ...user,
      returnSecureToken: true
    })
  }

  onLogin(user: User): Observable<responseData>  {
    return this.http.post<responseData>(environment.login, {
      ...user,
      returnSecureToken: true
    })
  }

}