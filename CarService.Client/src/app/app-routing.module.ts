import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';

import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EmailConfirmComponent } from './components/email-confirm/email-confirm.component';
import { PersonalAccountComponent } from './components/personal-account/personal-account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileOrdersComponent } from './components/profile-orders/profile-orders.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car-list', component: CarListComponent },
  { path: 'cardetail/:id', component: CarDetailComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'google-map', component: GoogleMapComponent },
  { path: 'order-list', component: OrderListComponent },
  {
    path: 'personalAccount', component: PersonalAccountComponent, children: [
      { path: 'profile', component: ProfileComponent, outlet: 'personalAccountOutlet' },
      { path: 'profile/edit-profile', component: EditProfileComponent, outlet: 'personalAccountOutlet' },
      { path: 'profile-orders', component: ProfileOrdersComponent, outlet: 'personalAccountOutlet' },
      { path: 'favorites', component: FavoritesComponent, outlet: 'personalAccountOutlet' }
    ]
  },

  { path: 'sign-in', component: SignInComponent },
  { path: 'email-confirm', component: EmailConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
