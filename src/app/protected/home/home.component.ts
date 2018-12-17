import { Component, OnInit } from "@angular/core";
import { UserdataService } from "src/app/prime/userdata.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  data;
  tab = 0;
  constructor(private us: UserdataService) {
    this.data = this.us.userData;
  }

  ngOnInit() {}
}
