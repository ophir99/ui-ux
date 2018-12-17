import { Component, OnInit } from "@angular/core";
import { MiscellaneousService } from "src/app/services/miscellaneous.service";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { MatSnackBar } from "@angular/material";
declare var $;
@Component({
  selector: "app-profile-creation",
  templateUrl: "./profile-creation.component.html",
  styleUrls: ["./profile-creation.component.scss"]
})
export class ProfileCreationComponent implements OnInit {
  min = new Date("1/1/1960");
  max = new Date("1/1/2010");
  start = new Date("1/1/1980");
  today = new Date("1/1/2019");
  countries = [];
  profileForm;
  filteredCountries;
  tab = 0;
  constructor(
    private miscellaneous: MiscellaneousService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private matSnackBar: MatSnackBar
  ) {
    this.createProfileForm();
    this.getcountries();

    this.filteredCountries = this.profileForm.get("country").valueChanges.pipe(
      startWith(""),
      map(country =>
        country ? this._filterCountries(country) : this.countries.slice()
      )
    );
    this.addEducationDetails();
    this.addCertifications();
    this.addCareerDetails();
    this.addSkills();
    this.addProjects();
  }

  ngOnInit() {}

  nextTab() {
    if (this.tab !== 3) {
      this.tab++;
    }
  }
  prevTab() {
    if (this.tab !== 0) {
      this.tab--;
    }
  }
  getcountries() {
    this.miscellaneous.getCountries().subscribe((res: any) => {
      this.countries = res;
    });
  }
  _filterCountries(country) {
    const filterValue = country.toLowerCase();

    return this.countries.filter(
      country_ => country_.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      DOB: ["", [Validators.required]],
      country: ["", [Validators.required]],
      aboutYourself: [""],
      email: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      certifications: this.formBuilder.array([]),
      educationDetails: this.formBuilder.array([]),
      careerDetails: this.formBuilder.array([]),
      skills: this.formBuilder.array([]),
      projects: this.formBuilder.array([])
    });
  }

  addEducationDetails() {
    const formGroup = this.formBuilder.group({
      institution: [],
      location: [],
      degree: [],
      grade: [],
      fromYear: [],
      toYear: []
    });
    (this.profileForm.get("educationDetails") as FormArray).push(formGroup);
  }

  addCertifications() {
    const formGroup = this.formBuilder.group({
      name: [],
      givenBy: [],
      year: [],
      validUpto: [],
      description: []
    });
    (this.profileForm.get("certifications") as FormArray).push(formGroup);
  }
  addSkills() {
    const formGroup = this.formBuilder.group({
      name: [],
      experience: [],
      rating: []
    });
    (this.profileForm.get("skills") as FormArray).push(formGroup);
  }
  addCareerDetails() {
    const formGroup = this.formBuilder.group({
      company: [],
      designation: [],
      location: [],
      fromYear: [],
      toYear: [],
      activeEmployee: [],
      achievements: this.formBuilder.array([]),
      projects: this.formBuilder.array([])
    });
    (this.profileForm.get("careerDetails") as FormArray).push(formGroup);
    const length = (this.profileForm.get("careerDetails") as FormArray).controls
      .length;
    this.addAchievementsForCareer(length - 1);
  }

  addProjects() {
    const formGroup = this.formBuilder.group({
      name: [],
      startingDate: [],
      endingDate: [],
      toolsUsed: [],
      description: []
    });
    (this.profileForm.get("projects") as FormArray).push(formGroup);
  }
  removeEducationDetails(ind) {
    (this.profileForm.get("educationDetails") as FormArray).removeAt(ind);
  }
  removeCareerDetails(ind) {
    (this.profileForm.get("careerDetails") as FormArray).removeAt(ind);
  }
  removeSkills(ind) {
    (this.profileForm.get("skills") as FormArray).removeAt(ind);
  }
  removeProjects(ind) {
    (this.profileForm.get("projects") as FormArray).removeAt(ind);
  }
  removeCertifications(ind) {
    (this.profileForm.get("certifications") as FormArray).removeAt(ind);
  }

  addAchievementsForEdu(ind) {
    ((this.profileForm.get("educationDetails") as FormArray).controls[ind].get(
      "achievements"
    ) as FormArray).push(new FormControl());
  }
  removeAchievementsFromEdu(ind, ind_) {
    ((this.profileForm.get("educationDetails") as FormArray).controls[ind].get(
      "achievements"
    ) as FormArray).removeAt(ind_);
  }
  addAchievementsForCareer(ind) {
    ((this.profileForm.get("careerDetails") as FormArray).controls[ind].get(
      "achievements"
    ) as FormArray).push(new FormControl());
  }
  addProjectsForCareer(ind) {
    ((this.profileForm.get("careerDetails") as FormArray).controls[ind].get(
      "projects"
    ) as FormArray).push(new FormControl());
  }
  removeAchievementsFromCareer(ind, ind_) {
    ((this.profileForm.get("careerDetails") as FormArray).controls[ind].get(
      "achievements"
    ) as FormArray).removeAt(ind_);
  }

  submit() {
    console.log(this.profileForm.value);
    this.userService
      .profile({
        profile: this.profileForm.value,
        user: sessionStorage.getItem("user_pro")
      })
      .subscribe(res => {
        console.log(res);
        this.matSnackBar.open("Profile created", "", { duration: 2000 });
      });
  }
}
