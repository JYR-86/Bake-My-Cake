import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { SellerService } from 'src/app/services/seller.service';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  constructor(private sellerService: SellerService, private route : Router) {}
  message: string = 'In Process';
  ngOnInit(): void {
    this.getOrderList();
  }

  newOrderArray: any = [];
  getOrderList() {
    this.sellerService.getUserOrderItem().subscribe((data) => {
      console.log(data);
      console.log(typeof data);
      if (data && data.length > 0) {
        for (let i of data) {
          this.newOrderArray.push(i);
        }
        console.log(this.newOrderArray);
      }
    });
  }

  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.sellerService.cancelOrder(orderId).subscribe((result) => {
        if (result) {
          this.sellerService.getUserOrderItem().subscribe((result)=>{
            console.log(result)
            this.newOrderArray=result;
          })
          // this.getOrderList();
          this.message = 'Rejected';
          this.route.navigate(['seller-home']);
        }
      });
      
  }

  orderAccept(data:any) {
    console.log(data)
    this.message="Accepted";
    this.isCol=true;
    
    
  }
  isCol: boolean = false;
  
}
