import { Component, Input, Output, EventEmitter } from "@angular/core";
import { OptionModel } from "../models/options.model";
import { ThemeService } from "../services/theme/theme.service";

@Component({
  selector: "app-theme",
  templateUrl: "./theme.component.html",
  styleUrls: ["./theme.component.css"],
})
export class ThemeComponent {
  @Input() options: Array<OptionModel>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  changeTheme(themeToSet) {
    this.themeChange.emit(themeToSet);
  }
}
