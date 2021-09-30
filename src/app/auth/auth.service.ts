import { AuthUserModel } from './auth.user.model';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable,  throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface currentUser {
  email: string;
  _token: string;
  _tokenExipresIn: string;
  fbId: string;
  isAdmin: boolean;
}

interface responseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registere?: boolean;
  isAdmin?: boolean;
  FBid?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $currentUser = new BehaviorSubject<AuthUserModel | null>(null);
  currentUser = this.$currentUser.asObservable();

  logoutTimer: any;

  constructor(private http: HttpClient) {}

  // registers user

  onSignup(user: User): Observable<responseData> {
    return this.http
      .post<responseData>(environment.signup, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        switchMap((res) => {
          return this.registerOnFirebase(user).pipe(
            map((fbRes) => {
              return { fbRes: { ...fbRes }, ...res };
            })
          );
        })
      );
  }

  // returns authentificated user

  onLogin(user: User): Observable<responseData> {
    return this.http
      .post<responseData>(environment.login, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        mergeMap((authenticatedUser) => {
          return this.getDataFromFirebase(user.email).pipe(
            map((fbResponse) => {
              return { ...authenticatedUser, ...fbResponse };
            })
          );
        }),
        catchError(err => {
          const newErrMessage = err.error.error.message;
          return throwError(newErrMessage)
        })
      );
  }

  // register user on firebase

  private registerOnFirebase(user: User) {
    return this.http.post<{ name: string }>(
      environment.firebase + 'users.json',
      {
        ...user,
        isAdmin: Math.random() > 0.5,
      }
    );
  }

  // gets user metadata from firebase

  private getDataFromFirebase(
    email: string
  ): Observable<{ isAdmin: boolean; FBid: string }> {
    return this.http
      .get<{ [key: string]: { email: string; isAdmin: boolean } }>(
        environment.firebase + 'users.json'
      )
      .pipe(
        map((fbUsers) => {
          const temp = { isAdmin: false, FBid: 'test' };
          for (const key in fbUsers) {
            if (fbUsers[key].email === email) {
              temp.isAdmin = fbUsers[key].isAdmin;
              temp.FBid = key;
              break;
            }
          }
          return temp;
        })
      );
  }

  // logs out. clearstimer

  logout() {
    this.$currentUser.next(null);
    localStorage.removeItem('userData');

    if(this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  // Creates global Authentificated user.

  createCurrUser(
    email: string,
    _token: string,
    _tokenExipresIn: string,
    fbId: string | undefined,
    isAdmin: boolean | undefined
  ) {
    if (fbId !== undefined && isAdmin !== undefined) {
      const user = new AuthUserModel(
        email,
        isAdmin,
        _token,
        new Date(new Date().getTime() + +_tokenExipresIn * 1000),
        fbId
      );
      this.autoLogout(+_tokenExipresIn * 1000);
      this.$currentUser.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  // auto Login function..

  autoLogin() {
    const temp: {
      email: string;
      fbId: string;
      isAdmin: boolean;
      _token: string;
      _tokenExpiresDate: Date;
    } = JSON.parse(localStorage.getItem('userData')!);

    let loadedUser;
    
    if(temp){
      loadedUser = new AuthUserModel(
        temp.email,
        temp.isAdmin,
        temp._token,
        new Date(temp._tokenExpiresDate),
        temp.fbId
      );
    }
        

    if (!loadedUser || !loadedUser.token) {
      return
    }

    this.autoLogout(new Date(loadedUser.tokenExpiresDate).getTime() - new Date().getTime());

    this.$currentUser.next(loadedUser);

    return;
  }

  // auto Logout function.

  autoLogout(expiresIn: number) {  
    this.logoutTimer = setTimeout(() => {
      
      this.logout();

    }, expiresIn);
  }
}
