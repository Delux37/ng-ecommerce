import { map, mergeMap, switchMap } from 'rxjs/operators';
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
  isAdmin?: boolean;
  FBid?: string;
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
    }).pipe(
      switchMap(res => {
        return this.registerOnFirebase(user)
        .pipe(
          map(fbRes => {
            return { fbRes: { ...fbRes }, ...res  }
          }
          )
        )
      })
    )
  }

  onLogin(user: User): Observable<responseData>  {
    return this.http.post<responseData>(environment.login, {
      ...user,
      returnSecureToken: true
    }).pipe(
      mergeMap(authenticatedUser => {
        return this.getDataFromFirebase(user.email)
          .pipe(
            map(
              fbResponse => {
                return { ...authenticatedUser, ...fbResponse }
              }
            )
          )
      })
    )
  }

  private registerOnFirebase(user: User)  {
    return this.http.post<{ name: string }>(environment.firebase + 'users.json', {
      ...user,
      isAdmin: Math.random() > .5
    })
  }

  private getDataFromFirebase(email: string): Observable<{ isAdmin: boolean, FBid: string }>{
    return this.http.get<{ [key: string]: { email: string, isAdmin: boolean } }>(environment.firebase + 'users.json')
    .pipe(
      map(fbUsers => {
        const temp = { isAdmin: false, FBid: 'test' }
        for(const key in fbUsers){
          if(fbUsers[key].email === email) {
            temp.isAdmin = fbUsers[key].isAdmin;
            temp.FBid = key;
            break;
          }
        }
        return temp
      })
      )
  }
}