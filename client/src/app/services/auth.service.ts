import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { logging } from 'protractor';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, retry, catchError, tap, mapTo } from 'rxjs/operators';
import { UserModel } from '../Models/User';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any ;
  constructor(private Http: HttpClient) { }
  FindEmail(Email): Observable<UserModel> {
    return this.Http.post<UserModel>(environment.ApiPath + 'Identity/GetUserByEmail', { Email })
      .pipe(retry(1), catchError(this.errorHandle));

  }
  FindUserName(UserName) {
    return this.Http.post<UserModel>(environment.ApiPath + 'Identity/GetUserByUserName', { UserName })
      .pipe(retry(1), catchError(this.errorHandle));
  }
  FindPhone(PhoneNumber) {
    return this.Http.post<UserModel>(environment.ApiPath + 'Identity/GetUserByPhoneNumber', PhoneNumber)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  RefreshToken(refreshtoken: string) {
    return this.Http.post<UserModel>(environment.ApiPath + 'Identity/Refresh_Token', { refreshtoken })
      .pipe(tap(UserModel => {
        this.setToken(UserModel.AccessToken);
        localStorage.setItem('RefreshToken', UserModel.RefreshToken);
      }), catchError(this.errorHandle));
  }

  login(Model: { Email: any; Password: any; }): Observable<any> {
    //return of(true);
    
    return this.Http.post<any>(environment.ApiPath + 'Identity/Authenticate', Model)
      .pipe(map(UserModel => {
        if (UserModel && UserModel.AccessToken) {          
          localStorage.setItem('UserName', UserModel.UserName);
          localStorage.setItem('RefreshToken', UserModel.RefreshToken);
          localStorage.setItem('role', UserModel.Role);
          localStorage.setItem("User", JSON.stringify(UserModel.User));
          this.setToken(UserModel.AccessToken);
          this.currentUser = UserModel;
        }
        return UserModel;
      }));
  }

  loginAdmin(Model: { Email: any; Password: any; }) {
    return this.Http.post<UserModel>(environment.ApiPath + 'Identity/AuthenticateAdmin', Model)
      .pipe(map(UserModel => {
        if (UserModel && UserModel.AccessToken) {
          localStorage.setItem('UserName', UserModel.UserName);
          localStorage.setItem('RefreshToken', UserModel.RefreshToken);
          localStorage.setItem('role', UserModel.Role);
          this.setToken(UserModel.AccessToken);
        }
      }));

  }



  setLSObject(key: string, obj: any) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }

  getLSObject(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  resetPassword(Model: { Email: any }): Observable<any> {

    return this.Http.post<UserModel>(environment.ApiPath + 'Identity/sendResetPswLink', Model);
  }
  getUser() {
    debugger
    this.currentUser = this.getLSObject('User')
  }

  updatePassword(Model: { userId: any; password: any; }): Observable<any> {
    return this.Http.post<any>(environment.ApiPath + 'Identity/updatePassword', Model);
  }

/**Logout API Calling */
  LogOut() {    
    debugger
    if (!this.currentUser) {
      this.getUser();
    }
    let m = { email: this.currentUser.Email };
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${this.currentUser.AccessToken}`)
     this.Http.post<any>(environment.ApiPath + 'Identity/Log_Out', m).subscribe(r=>{
      localStorage.clear(); 
     },error=>{
      localStorage.clear();
     },() =>{      
      
     })


     return this.Http.post<any>(environment.ApiPath + 'Identity/Log_Out', m).pipe(
      tap(() => localStorage.clear()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));

  }

  CreateUser(UserModel) {
    return this.Http.post(environment.ApiPath + 'Identity/CreateAccount', UserModel).pipe(retry(1), catchError(this.errorHandle));

  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('RefreshToken');
  }

  Islogin() {

    if (localStorage.getItem('token') === null) { return false; }
    else { return true; }
  }
getCurrentUser(){
  if(!this.currentUser.Email){
    const _user=this.getLSObject('User')
    if(_user){
      this.currentUser=_user;
    }
  }
  return this.currentUser;
}

  errorHandle(error) {
    let errormgs = {};
    if (error.error instanceof ErrorEvent) {
      // get client side error
      errormgs = error.error.message;
    }
    else {
      // get server-side error
      errormgs = { ErrorCode: error.status, Message: error.message, Response: error.error.Mgs };
    }
    console.log(errormgs);
    return throwError(errormgs);
  }

}
