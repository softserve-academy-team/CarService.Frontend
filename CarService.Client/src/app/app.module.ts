import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FileUploadModule } from "ng2-file-upload/file-upload/file-upload.module";

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
import { PersonalAccountComponent } from './components/personal-account/personal-account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EmailConfirmComponent } from './components/email-confirm/email-confirm.component';
import { ProfileOrdersComponent } from './components/profile-orders/profile-orders.component';
import { CustomerOrderInfoComponent } from './components/customer-order-info/customer-order-info.component';
import { MechanicRateComponent } from './components/mechanic-rate/mechanic-rate.component';

import { RestUrlBuilder } from './services/rest-url-builder';
import { CarService } from './services/car.service';
import { FilterService } from './services/filter.service';
import { CommunicationService } from './services/communication.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { RegistrationService } from './services/registration.service';
import { ProfileService } from './services/profile.service';
import { PasswordValidation } from './validation/password-validation';

import { CreateOrderDialogComponent } from './dialogs/create-order-dialog/create-order-dialog.component';
import { UnregisterUserDialogComponent } from './dialogs/unregister-user-dialog/unregister-user-dialog.component'
import { ReviewPropositionDialogComponent } from './dialogs/review-proposition-dialog/review-proposition-dialog.component'
import { ProfileOrderCardComponent } from './components/profile-order-card/profile-order-card.component';
import { BaseCarInfoCardComponent } from './components/base-car-info-card/base-car-info-card.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

import { GoogleMapComponent } from './components/google-map/google-map.component';
import { OrderListComponent } from './components/order-list/order-list.component';

import { CarPhotoPipe } from './pipes/car-photo.pipe';
import { UserPhotoPipe } from './pipes/user-photo.pipe';
import { OrderService } from './services/order.service';
import { OrderCardComponent } from './components/order-card/order-card.component';

import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { OrderFilterComponent } from './components/order-filter/order-filter.component';
import { MapsService } from './services/maps-service';
import { ReviewCreateComponent } from './components/review-create/review-create.component';
import { ReviewBodyComponent } from './components/review-body/review-body.component';
import { ReviewService } from './services/review.service';
import { MechanicOrderInfoComponent } from './components/mechanic-order-info/mechanic-order-info.component';
import { ReviewInfoComponent } from './components/review-info/review-info.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ProfileReviewsComponent } from './components/profile-reviews/profile-reviews.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';


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
    ProfileComponent,
    EditProfileComponent,
    EmailConfirmComponent,
    CreateOrderDialogComponent,
    UnregisterUserDialogComponent,
    ReviewPropositionDialogComponent,
    PersonalAccountComponent,
    ProfileOrdersComponent,
    ProfileOrderCardComponent,
    BaseCarInfoCardComponent,
    FavoritesComponent,
    GoogleMapComponent,
    OrderListComponent,
    CarPhotoPipe,
    UserPhotoPipe,
    OrderCardComponent,
    OrderFilterComponent,
    ReviewCreateComponent,
    ReviewBodyComponent,
    CustomerOrderInfoComponent,
    MechanicRateComponent,
    MechanicOrderInfoComponent,
    ReviewInfoComponent,
    VideoPlayerComponent,
    ProfileReviewsComponent,
    ReviewCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBzn2O9Ly8zKnsaf_kltqQNrpSLCSlA6U',
      libraries: ["places"]
    }),
    AgmJsMarkerClustererModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [
    RestUrlBuilder,
    CarService,
    PasswordValidation,
    FilterService,
    CommunicationService,
    RegistrationService,
    ProfileService,
    AuthService,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MapsService,
    ReviewService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateOrderDialogComponent,
    UnregisterUserDialogComponent,
    ReviewPropositionDialogComponent]
})
export class AppModule { }
