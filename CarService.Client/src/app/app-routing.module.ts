import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarListComponent } from './components/car-list/car-list.component'

const routes: Routes = [
  { path: '', component: CarouselComponent },
  { path: 'carlist', component: CarListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
