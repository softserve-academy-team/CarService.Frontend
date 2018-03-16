import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatDivider, MatTableModule, MatMenuModule, MatSidenavModule, MatNativeDateModule, MatStepperModule, MatProgressBarModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }