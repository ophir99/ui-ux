import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-prime",
  templateUrl: "./prime.component.html",
  styleUrls: ["./prime.component.scss"],
  animations: [
    trigger("anim", [
      transition("void => *", [
        style({
          opacity: 0
        }),
        animate(500)
      ])
    ])
  ]
})
export class PrimeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  loginWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=123456789&redirect_uri=https%3A%2F%2Fwww.example.com%2Fauth%2Flinkedin&state=987654321&scope=r_basicprofile,r_emailaddress`;
  }
  loginWithFacebook() {}
  loginWithGoogle() {}
}
