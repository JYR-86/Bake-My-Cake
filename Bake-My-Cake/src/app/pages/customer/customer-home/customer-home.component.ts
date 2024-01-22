import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart-item';
import { Item } from 'src/app/models/item';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
})
export class CustomerHomeComponent implements OnInit {
  itemData: undefined | Item;
  itemQty: number = 1;
  removeCart = false;
  cartData: Item | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private itemService: FoodService,
    private route: Router
  ) {}
  ngOnInit(): void {
    let itemid = this.activeRoute.snapshot.paramMap.get('itemId');
    console.log(itemid);
    itemid &&
      this.itemService.getItem(itemid).subscribe((result) => {
        console.log(result);
        this.itemData = result;
        let cartData = localStorage.getItem('localCart');
        if (itemid && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: Item) => itemid === item.id.toString());
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.itemService.getCartList(userId);
      this.itemService.cartData.subscribe((result) => {
        let item = result.filter(
          (item: Item) => itemid?.toString() === item.id.toString()
        );
        if (item.length) {
          this.removeCart = true;
          this.cartData = item[0];
        }
      });
    }

    
  }
 

  handleQty(val: string) {
    if (this.itemQty < 20 && val === 'plus') {
      this.itemQty += 1;
    } else if (this.itemQty > 1 && val === 'min') {
      this.itemQty -= 1;
    }
  }

  addItemToCart() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.itemData) {
      this.itemData.qty = this.itemQty;
      if (localStorage.getItem('user')) {
        console.log('user is logged in');

        let cartData: Cart = {
          ...this.itemData,
          itemId: this.itemData.id,
          userId,
        };
        delete cartData.id;
        console.log(cartData);
        this.itemService.addItemCart(cartData).subscribe((result) => {
          if (result) {
            this.itemService.getCartList(userId);
            this.removeCart = true;
          }
        });

      }
    }
    setTimeout(() => {
      this.itemService.getCartList(userId);
    }, 5000);
  }

  goCart() {
    this.addItemToCart();
    this.route.navigate(['cart']);
  }
}
