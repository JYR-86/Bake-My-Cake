import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';


import { SearchComponent } from './components/landing/search/search.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/landing/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { SellerComponent } from './pages/seller/seller.component';
import { SellerHomeComponent } from './pages/seller/seller-home/seller-home.component';
import { SellerAddProductsComponent } from './pages/seller/seller-add-products/seller-add-products.component';
import { SellerUpdateItemComponent } from './pages/seller/seller-update-item/seller-update-item.component';
import { SellerItemListComponent } from './pages/seller/seller-item-list/seller-item-list.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerHomeComponent } from './pages/customer/customer-home/customer-home.component';
import { CartComponent } from './pages/customer/customer-home/cart/cart.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';












@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    SearchComponent,

    CardComponent,
    SellerComponent,
    SellerHomeComponent,
    SellerAddProductsComponent,
    SellerUpdateItemComponent,
    SellerItemListComponent,
    CustomerComponent,
    CustomerHomeComponent,
    CartComponent,
    FooterComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatChipsModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    FontAwesomeModule,
    NgbModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
