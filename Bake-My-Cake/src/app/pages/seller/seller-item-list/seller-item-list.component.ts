import { Component, ViewChild } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/models/item';
import { FoodService } from 'src/app/services/food.service';
import { SellerService } from 'src/app/services/seller.service';


@Component({
  selector: 'app-seller-item-list',
  templateUrl: './seller-item-list.component.html',
  styleUrls: ['./seller-item-list.component.css'],
})
export class SellerItemListComponent {
  //icons
  removeIcon = faTrash;
  editIcon = faPenToSquare;


  ItemList: undefined | Item[];
  removeMessage: undefined | string;
  constructor(private itemListService: FoodService, private requestOrder:SellerService) {}
  ngOnInit(): void {
    this.list();
    // this.newList();
  
  }

  list() {
    this.itemListService.getAll().subscribe((result) => {
      this.ItemList = result;
    });
  }
  // newItemList:any=[];
  // newList(){
  //   this.requestOrder.getUserOrderItem().subscribe((data)=>{
  //     this.newItemList = data;
  //     console.log(this.newItemList)
  //   })
  // }
  deleteItem(id: number) {
    this.itemListService.removeItem(id).subscribe((result) => {
      if (result) {
        this.removeMessage = 'Item removed successfully !!!';
        this.list();
      }
    });
    setTimeout(() => {
      this.removeMessage = undefined;
    },5000);
  }

  
}
