import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule
} from "@angular/material";
import { PrimeComponent } from "./prime/prime.component";
import { NavbarComponent } from "./widgets/navbar/navbar.component";
import { HomeComponent } from "./protected/home/home.component";
import { FooterComponent } from './footer/footer.component';
import { CreateuserComponent } from './createuser/createuser.component';
@NgModule({
  declarations: [AppComponent, PrimeComponent, NavbarComponent, HomeComponent, FooterComponent, CreateuserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
