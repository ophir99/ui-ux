import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrimeComponent } from "./prime/prime.component";
import { HomeComponent } from "./protected/home/home.component";
import { CreateuserComponent } from "./createuser/createuser.component";

const routes: Routes = [
  {
    path: "",
    component: PrimeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "create",
    component: CreateuserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
