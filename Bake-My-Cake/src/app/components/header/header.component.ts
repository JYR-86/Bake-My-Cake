import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  UIType: string = 'default';
  sellerSignature: string = '';
  userSignature: string = '';
  cartItems=0;
  constructor(private router: Router, private itemService:FoodService, private sellerService:SellerService) {}
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log('inside seller area');
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          console.log(sellerData)
          this.sellerSignature = sellerData.name;
          this.UIType = 'seller';
        } else if (localStorage.getItem('user')) {
          console.log('inside user area');
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userSignature = userData.firstName;
          this.UIType = 'user';
          this.itemService.getCartList(userData.id)
        } else {
          console.log('outside to seller area');
          this.UIType = 'default';
        }
      }
    });
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
    this.itemService.cartData.subscribe((items)=>{
      this.cartItems= items.length
    })
  }
  onLogout() {
    localStorage.removeItem('seller');
    alert('Logout Successfully !!');
    this.router.navigate(['home']);
  }
  userLogout(){
    localStorage.removeItem('user');
    alert('Logout Successfully !!');
    this.router.navigate(['home'])
  };
}
