import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  Foods: Item[] = [];
  constructor(private food_service: FoodService) {}

  ngOnInit(): void {
    this.getAllFoodDataFromServer();
  }

  getAllFoodDataFromServer() {
    this.food_service.getAll().subscribe((res) => {
      this.Foods = res;
    });
  }

  searchFood(data: string) {
    if (data) {
      this.Foods = this.Foods.filter((itm) =>
        itm.name?.toLowerCase().includes(data.toLowerCase())
      );
    } else {
      this.getAllFoodDataFromServer();
    }
  }
  count: number | undefined;
  getTag(tag: string) {
    let filtered: Item[] = [];
    if (tag === 'All') {
      this.food_service.getAll().subscribe((result)=>{
        filtered = result;
        this.Foods=filtered;
      })
    } else {
      this.food_service.getAll().subscribe((result) => {
        filtered = result.filter((cat) => cat.category === tag);
        console.log(filtered);
        this.Foods = filtered;
      });
    }
  }
}
