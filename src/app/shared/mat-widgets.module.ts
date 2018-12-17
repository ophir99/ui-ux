import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatSnackBarModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatSliderModule
} from "@angular/material";
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatSliderModule
  ]
})
export class MatWidgetsModule {}
