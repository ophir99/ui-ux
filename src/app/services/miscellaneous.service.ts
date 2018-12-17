import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MiscellaneousService {
  constructor(private http: HttpClient) {}

  getCountries = () => this.http.get("https://restcountries.eu/rest/v2/all");
}
