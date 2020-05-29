import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Subscription, Observable } from "rxjs";
import { OptionModel } from "../models/options.model";
import { ThemeService } from "../services/theme/theme.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  options$: Observable<
    Array<OptionModel>
  > = this.themeService.getThemeOptions();
  userIsAuthenticated: boolean = false;
  userName: string;
  private authListenersSubs: Subscription;
  constructor(
    private authService: AuthService,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.setTheme("deeppurple-amber");
    this.userName = this.authService.getUserName();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenersSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userName = this.authService.getUserName();
      });
  }

  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenersSubs.unsubscribe();
  }
}
