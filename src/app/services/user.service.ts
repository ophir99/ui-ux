import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { urls } from "./../../config";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  create = data => this.http.post(`${urls.production}/user/create`, data);

  login = data => this.http.post(`${urls.production}/user/login`, data);

  profile = data => this.http.post(`${urls.production}/user/profile`, data);
}
