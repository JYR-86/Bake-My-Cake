import { Component, OnInit } from '@angular/core';
import { LogIn } from 'src/app/models/seller-login';
import { SignUp } from 'src/app/models/seller-signup';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  constructor(private sellerService: SellerService) {}
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  name: string = '';
  password: string = '';
  uniqueCode: string = '';
  getUniqueCode() {
    if (this.name.length > 3) {
      this.uniqueCode += this.name.slice(0, 3);
    } else {
      this.uniqueCode += this.name;
    }
    this.uniqueCode += this.password.slice(0, 2);
    this.uniqueCode += Math.floor(Math.random() * 100) + 1;
    this.uniqueCode = this.uniqueCode.toUpperCase();
  }
  isLoggedIn: boolean = false;
  openLogin() {
    this.isLoggedIn = true;
  }
  openSignin() {
    this.isLoggedIn = false;
  }

  authError: string = '';
  onSignIn(sellerData: SignUp) {
    this.sellerService.addSeller(sellerData);
  }
  onLogIn(sellerData: LogIn) {
    this.sellerService.isSellerSignIn(sellerData);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is not correct';
      }
    });
  }
}
