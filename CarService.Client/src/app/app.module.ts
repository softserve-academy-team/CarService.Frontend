import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarDetailGalleryComponent } from './components/car-detail-gallery/car-detail-gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { FilterComponent } from './components/filter/filter.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { RestUrlBuilder } from './services/rest-url-builder';
import { CarService } from './services/car.service';
import { FilterService } from './services/filter.service';
import { CommunicationService } from './services/communication.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { RegistrationService } from './services/registration.service'; 
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './services/profile.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PasswordValidation } from './validation/password-validation';
import { EmailConfirmComponent } from './components/email-confirm/email-confirm.component';

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
        SignInComponent,
        FilterComponent,
        HomeComponent,
        CarDetailGalleryComponent,
        ProfileComponent,
        EditProfileComponent,
        EmailConfirmComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    providers: [
        RestUrlBuilder,
        CarService,
        PasswordValidation,
        FilterService,
        CommunicationService,
        RegistrationService,
        ProfileService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
