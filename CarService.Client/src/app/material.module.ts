import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatDivider } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
      ]
  })
  export class MaterialModule { }