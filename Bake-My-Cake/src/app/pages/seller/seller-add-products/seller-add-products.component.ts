import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-seller-add-products',
  templateUrl: './seller-add-products.component.html',
  styleUrls: ['./seller-add-products.component.css'],
})
export class SellerAddProductsComponent implements OnInit{
  message: string | undefined;
  popItemImage: undefined | Item[];
  constructor(private newItemAddService: FoodService) {}
  ngOnInit(): void {
    this.newItemAddService.movingItemImage().subscribe((data) => {
      this.popItemImage = data;
    });
  }
  onAddItem(item: any) {
    let itemObj: Item = {
      name: item.name,
      category: item.category,
      price: parseInt(item.price),
      rating: parseInt(item.rating),
      time: item.time,
      isVeg: item.isVeg,
      id: item.id,
    };
    this.newItemAddService.addItem(itemObj).subscribe((response) => {
      this.message = 'Item is added successfully !!!';
    });
    setTimeout(() => {
      this.message = undefined;
    });
  }
}
