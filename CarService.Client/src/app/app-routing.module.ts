import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarlistComponent } from './components/carlist/carlist.component'

const routes: Routes = [
  { component: CarouselComponent, path: 'carousel'},
  { component: CarlistComponent, path: 'carlist'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
