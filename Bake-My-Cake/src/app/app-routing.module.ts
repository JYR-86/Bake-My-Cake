import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SellerComponent } from './pages/seller/seller.component';
import { SellerHomeComponent } from './pages/seller/seller-home/seller-home.component';
import { AuthGuard } from './gaurd/auth.guard';
import { SellerAddProductsComponent } from './pages/seller/seller-add-products/seller-add-products.component';
import { SellerUpdateItemComponent } from './pages/seller/seller-update-item/seller-update-item.component';
import { SellerItemListComponent } from './pages/seller/seller-item-list/seller-item-list.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerHomeComponent } from './pages/customer/customer-home/customer-home.component';
import { CardComponent } from './components/landing/card/card.component';
import { CartComponent } from './pages/customer/customer-home/cart/cart.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: LandingComponent },
  {
    path: 'user-login',
    component: CustomerComponent,
  },
  { path: 'seller', component: SellerComponent },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-add-products',
    component: SellerAddProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-update-items/:id',
    component: SellerUpdateItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-item-list',
    component: SellerItemListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-home/:itemId',
    component: CustomerHomeComponent,
    
  },
  {path:'cart', component:CartComponent,canActivate:[AuthGuard] },
  {path:'**', component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
