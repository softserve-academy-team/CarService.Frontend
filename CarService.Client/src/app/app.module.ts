import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarlistComponent } from './components/carlist/carlist.component';

import { CarService } from './services/car.service';


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    CarlistComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
