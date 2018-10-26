import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ui";
  showToolbar = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(res => {
      this.router.url !== "/"
        ? (this.showToolbar = true)
        : (this.showToolbar = !true);
    });
  }
}
