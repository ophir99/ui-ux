import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PrimeComponent } from "./prime/prime.component";
import { NavbarComponent } from "./widgets/navbar/navbar.component";
import { HomeComponent } from "./protected/home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { CreateuserComponent } from "./createuser/createuser.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatWidgetsModule } from "./shared/mat-widgets.module";
import { ProfileCreationComponent } from "./protected/profile-creation/profile-creation.component";

@NgModule({
  declarations: [
    AppComponent,
    PrimeComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CreateuserComponent,
    ProfileCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatWidgetsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
