import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { backend } from 'src/environments/environment';
import { map } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) {

  }

  authenticationService(username: String, password: String) {
    const href = backend;
    let headers_object = new HttpHeaders();
    headers_object = headers_object
        .append('Content-Type', 'application/x-www-form-urlencoded')
    const httpOptions = {
      headers: headers_object
    };
      return this.http.post<any>(`${href}authenticate/token`, { username, password },httpOptions)
      .pipe(map(user => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
          //localStorage.setItem('currentUser', JSON.stringify(user));
         // this.currentUserSubject.next(user);
         
          return user;
      }));
  }

  // createBasicAuthToken(username: String, password: String) {
  //   return 'Basic ' + window.btoa(username + ":" + password)
  // }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}


// export class BasicAuthHtppInterceptorService implements HttpInterceptor {

//   constructor() { }

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log("----"+localStorage.getItem('acceesToken'));
//    // if (localStorage.getItem('token')) {
//       req = req.clone({
//         setHeaders: {
          
//             Authorization: `Bearer ${localStorage.getItem('acceesToken')}`,
//             'Cache-Control': 'no-cache',
//         }

       
//     });

//     return next.handle(req).pipe(
//       map(res => {
//           return res
//     }));
    

//   }
// }

  