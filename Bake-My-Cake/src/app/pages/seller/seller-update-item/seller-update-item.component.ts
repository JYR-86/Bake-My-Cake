import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-seller-update-item',
  templateUrl: './seller-update-item.component.html',
  styleUrls: ['./seller-update-item.component.css'],
})
export class SellerUpdateItemComponent implements OnInit {
  message: string | undefined;
  itemData:undefined | Item;
  constructor(
    private router: ActivatedRoute,
    private updateItemService: FoodService,
    private route : Router
  ) {}
  ngOnInit(): void {
    let itemId = this.router.snapshot.paramMap.get('id');
    itemId &&
      this.updateItemService.getItem(itemId).subscribe((data) => {
        // at starting is a condition like if itemId is undefined and string then subscribe
        console.log(data);
        this.itemData = data;
      });
  }

  onEditItem(formData: Item) {
    if(this.itemData){
      formData.id=this.itemData?.id;
    }
    console.log(formData);
    this.updateItemService.updateItem(formData).subscribe((result)=>{
      if(result){
        this.message="Item is updated successfully !!!"
      }
    })
    setTimeout(() => {
      this.message=undefined;
    },5000 );
  }
}
