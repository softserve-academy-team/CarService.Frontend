import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatDivider } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatGridListModule,
        MatDividerModule,
        MatFormFieldModule,
        MatDividerModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule
      ],
      exports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatGridListModule,
        MatDividerModule,
        MatFormFieldModule,
        MatDividerModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule
      ]
  })
  export class MaterialModule { }