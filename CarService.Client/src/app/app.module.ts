import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatDivider} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';

import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarListComponent } from './components/car-list/car-list.component';

import { CarUrlBuilder } from './services/car-url-builder';
import { CarService } from './services/car.service';


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    CarListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule
  ],
  providers: [
    CarUrlBuilder,
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
