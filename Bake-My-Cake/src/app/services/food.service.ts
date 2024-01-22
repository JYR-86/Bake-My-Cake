import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Cart } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  food_Url: string = 'http://localhost:3000/Items';
  Cart_Url: string = 'http://localhost:3000/cart';
  Order_Url: string = 'http://localhost:3000/orders';

  cartData = new EventEmitter<Item[]|[]>();
  constructor(private http: HttpClient) {}
  getAll():Observable<Item[]> {
    return this.http.get<Item[]>(this.food_Url);
  }
  addItem(item: Item): Observable<any> {
    return this.http.post(this.food_Url, item);
  }
  removeItem(itemId: number) {
    return this.http.delete(`${this.food_Url}/${itemId}`);
  }
  getItem(itemId: string) {
    return this.http.get<Item>(`${this.food_Url}/${itemId}`);
  }
  updateItem(item: Item) {
    return this.http.put<Item>(`${this.food_Url}/${item.id}`, item);
  }
  movingItemImage() {
    return this.http.get<Item[]>(`${this.food_Url}?_limit=5`);
  }
  addItemCart(cartData: Cart) {
    return this.http.post(this.Cart_Url, cartData)
  }
  getCartList(userId:number){
    return this.http.get<Item[]>(`${this.Cart_Url}?userId=${userId}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body)
      }
    })
  }
  removeItemFromCart(cartId:number){
    return this.http.delete(`${this.Cart_Url}/${cartId}`);
  }
  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`${this.Cart_Url}?userId=${userData.id}`);
  }
  finalOrder(orderData:any){
    return this.http.post(this.Order_Url,orderData)
  }
 
}
