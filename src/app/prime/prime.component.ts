import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { UserdataService } from "./userdata.service";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { UserService } from "../services/user.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

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
  activeTab = "login";
  regForm: FormGroup;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  constructor(
    private http: HttpClient,
    private uSer: UserdataService,
    private fb: FormBuilder,
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.createForgotPasswordForm();
    this.createLoginForm();
    this.createRegForm();
    this.setValidators(
      this.regForm.get("password"),
      this.regForm.get("confirmPassword")
    );
  }

  ngOnInit() {
    const url = window.location.search;
    if (url.includes("code")) {
      alert("Cool");
      const code = url.split("&")[0].split("=")[1];
      this.http
        .post(
          "http://ec2-18-225-32-22.us-east-2.compute.amazonaws.com/user/linkedin",
          { code: code }
        )
        .subscribe(
          (res: any) => {
            console.log("Res", res);
            this.uSer.userData = res.data;
            alert("Logged in With Linkedin");
            // this.router.navigateByUrl("./home");
            // window.location.href = `http://uiproductionenv.s3-website.us-east-2.amazonaws.com/home`;
          },
          err => console.log("err", err)
        );
    }
  }

  loginWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81d483npdmnqhy&redirect_uri=http://uiproductionenv.s3-website.us-east-2.amazonaws.com&state=987654321&scope=r_basicprofile,r_emailaddress`;
    // window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81d483npdmnqhy&redirect_uri=http://localhost:4200&state=987654321&scope=r_basicprofile,r_emailaddress`;
  }
  loginWithFacebook() {}
  loginWithGoogle() {}

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  createRegForm() {
    this.regForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      userName: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    });
  }
  setValidators(password: AbstractControl, confirmPassword: AbstractControl) {
    confirmPassword.setValidators((control: FormControl) => {
      if (password.value === control.value) {
        return null;
      }
      return {
        confirmPasswordError: true
      };
    });
  }

  createForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.email]]
    });
  }
  switchTab(tabType) {
    this.activeTab = tabType;
  }

  createUser() {
    if (this.regForm.invalid) {
      this.snack.open("Invalid data provided. Please provide valid data", "", {
        duration: 4000
      });

      return false;
    }
    this.userService.create(this.regForm.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error) {
          if ((res.error.code = "11000")) {
            this.snack.open(
              "This email is already in use. Please try with different one",
              "",
              {
                duration: 4000
              }
            );
          }
          return false;
        }
        this.snack.open("Your account is created. Please login", "", {
          duration: 4000
        });
        this.regForm.reset();
        this.activeTab = "login";
      },
      err => {
        this.snack.open("Unable to create account. Please try again", "", {
          duration: 4000
        });
      },
      () => {
        console.log("Done");
      }
    );
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.snack.open("Invalid data provided. Please provide valid data", "", {
        duration: 4000
      });

      return false;
    }
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error) {
          this.snack.open("Invalid email/password. Try again", "", {
            duration: 4000
          });
          return false;
        }
        sessionStorage.setItem("user_pro", res.response[0].email);
        this.router.navigateByUrl("profile");
      },
      err => {
        console.log(err);
        this.snack.open("Unable to login. Please try again", "", {
          duration: 4000
        });
      }
    );
  }
  sendEmail() {
    console.log(this.forgotPasswordForm.value);
  }
}
