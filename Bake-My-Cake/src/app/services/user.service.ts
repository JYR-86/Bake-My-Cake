import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignForm } from '../models/sign';
import { Router } from '@angular/router';
import { UserLogin } from '../models/user-login';
import { Cart } from '../models/cart-item';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  User_Url: string = 'http://localhost:3000/users';
  invalidUserError = new EventEmitter<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  addUserSignup(userData: SignForm) {
    return this.http
      .post<SignForm>(this.User_Url, userData, { observe: 'response' })
      .subscribe((result) => {
        console.log(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['home']);
        }
      });
  }
  reloadUser() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['home']);
    }
  }


  addUserLogin(userData: UserLogin) {
    this.http
      .get(
        `${this.User_Url}?username=${userData.username}&&password=${userData.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          console.log(result);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['home']);
          this.invalidUserError.emit(false);
        } else {
          this.invalidUserError.emit(true);
        }
      });
  }

  
}
