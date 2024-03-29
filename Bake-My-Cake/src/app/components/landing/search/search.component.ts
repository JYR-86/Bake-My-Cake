import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchItem:string="";
  @Output() searchEvent:EventEmitter<string> = new EventEmitter<string>();

  onSearch(){
    this.searchEvent.emit(this.searchItem);
  }
}
