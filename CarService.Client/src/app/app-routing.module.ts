import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarListComponent } from './components/car-list/car-list.component'

const routes: Routes = [
  { component: CarouselComponent, path: 'carousel'},
  { component: CarListComponent, path: 'carlist'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
