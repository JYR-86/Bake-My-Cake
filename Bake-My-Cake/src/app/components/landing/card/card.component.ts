import { Component,Input,OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input()
  item?:Item;
  vegValue:string="";
  ngOnInit(): void {
    if(this.item?.isVeg==='veg'){
      this.vegValue="Veg";
    }else{
      this.vegValue="Non-Veg";
    }
  }
  
}
