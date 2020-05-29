import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { StyleManagerService } from "./style-manager.service";
import { OptionModel } from "src/app/models/options.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {}

  getThemeOptions(): Observable<Array<OptionModel>> {
    return this.http.get<Array<OptionModel>>("assets/options.json");
  }

  setTheme(themeToSet) {
    this.styleManager.setStyle("theme", `assets/themes/${themeToSet}.css`);
  }
}
