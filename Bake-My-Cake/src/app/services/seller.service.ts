import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LogIn } from '../models/seller-login';
import { SignUp } from '../models/seller-signup';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  seller_Url: string = 'http://localhost:3000/seller';
  Order_Req_Url: string = 'http://localhost:3000/orders';

  constructor(private http: HttpClient, private router: Router) {}
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  addSeller(sellerData: SignUp) {
    this.http
      .post(this.seller_Url, sellerData, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-item-list']);
        }
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-item-list']);
    }
  }
  isSellerSignIn(sellerData: LogIn) {
    this.http
      .get(
        `${this.seller_Url}?email=${sellerData.username}&&uniqueCode=${sellerData.uniqueCode}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          console.log(result.body);
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result.body[0]));
          this.router.navigate(['seller-item-list']);
        } else {
          console.log('login failed');
          this.isLoginError.emit(true);
        }
      });
  }

  getUserOrderItem() {
    return this.http.get<any>(this.Order_Req_Url);
  }
  removeSeller(sellerId: number) {
    return this.http.delete(`${this.seller_Url}/${sellerId}`);
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`${this.Order_Req_Url}/${orderId}`);
  }
}
