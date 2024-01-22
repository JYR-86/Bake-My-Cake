import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart-item';
import { PriceSummary } from 'src/app/models/price-summary';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: Cart[] = [];
  totalPrice: number | undefined;
  cartSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private cartItem: FoodService, private route: Router) {}
  ngOnInit(): void {
    this.onLoadData();

    this.cartItem.currentCart().subscribe((result) => {
      result.forEach((i) => {
        this.cartData.push(i);

        // if (this.cartData.length) {
        //   this.route.navigate(['home']);
        // }
      });
    });

    console.log('hiii');
  }

  finalMessage: string | undefined;
  orderNow() {
    let user = localStorage.getItem('user');
    let userData = user && JSON.parse(user);

    let orderData = {
      ...userData,
      ...this.cartSummary,
      items: [...this.cartData],
    };
    delete orderData.confirmPassword;
    delete orderData.password;
    delete orderData.id;
    delete orderData.itemId;

    this.cartItem.finalOrder(orderData).subscribe((result) => {
      if (result) {
        this.finalMessage = 'Your Order is Successfully Placed !!!';
        console.log(result);
      }
    });
    setTimeout(() => {
      this.finalMessage = undefined;
    }, 3000);
  }
  cartemptymsg: undefined | string;

  removeToCart(cartId: number | undefined) {
    this.route.navigate(['cart']);
    cartId &&
      this.cartData &&
      this.cartItem.removeItemFromCart(cartId).subscribe((result) => {
        this.onLoadData();
        this.cartemptymsg = 'Item is removed !!!';
        this.cartItem.currentCart().subscribe((item)=>{
          console.log(item)
          this.cartData=item;
        })
      });

    setTimeout(() => {
      this.cartemptymsg = undefined;
    }, 3000);
  }

  onLoadData() {
    this.cartItem.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach((item) => {
        if (item.qty && item.price) {
          price = price + item.price * item.qty;
        }
      });
      console.log(this.cartData);
      this.cartSummary.price = price;
      this.cartSummary.discount = price / 10;
      this.cartSummary.tax = price / 10;
      this.cartSummary.delivery = 20;
      this.cartSummary.total = price + price / 10 + 20 - price / 10;
    });
  }
}
