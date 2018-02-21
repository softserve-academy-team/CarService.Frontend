import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatDivider } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { CarListComponent } from './components/car-list/car-list.component';

import { CarUrlBuilder } from './services/car-url-builder';
import { CarService } from './services/car.service';
import { FilterComponent } from './components/filter/filter.component';
import { FilterService } from './services/filter.service';
import { HomeComponent } from './components/home/home.component';
import { CommunicationService } from './services/communication.service';
import { CarDetailGalleryComponent } from './components/car-detail-gallery/car-detail-gallery.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PasswordValidation } from './validation/password-validation';


@NgModule({
    declarations: [
        AppComponent,
        CarouselComponent,
        CarDetailComponent,
        CarListComponent,
        FooterComponent,
        NavbarComponent,
        AboutComponent,
        CarDetailGalleryComponent,
        RegistrationComponent,
        FilterComponent,
        HomeComponent,
        CarDetailGalleryComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatGridListModule,
        MatDividerModule,
        MatFormFieldModule,
        MatDividerModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatToolbarModule
    ],
    providers: [
        CarUrlBuilder,
        CarService,
        PasswordValidation,
        FilterService,
        CommunicationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
