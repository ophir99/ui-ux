import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { HttpClient } from "@angular/common/http";

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
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = window.location.search;
    if (url.includes("code")) {
      console.log(url.split("&")[0].split("=")[1]);
      const code = url.split("&")[0].split("=")[1];
      this.http
        .post(
          "http://ec2-52-15-88-220.us-east-2.compute.amazonaws.com/linkedin",
          { code: code }
        )
        .subscribe(
          res => console.log("Res", res),
          err => console.log("err", err)
        );
    }
  }

  loginWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81d483npdmnqhy&redirect_uri=http://ec2-18-221-216-61.us-east-2.compute.amazonaws.com:4200&state=987654321&scope=r_basicprofile,r_emailaddress`;
  }
  loginWithFacebook() {}
  loginWithGoogle() {}
}
