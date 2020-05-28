import { Component, OnInit } from "@angular/core";
import { AddLocationDialogComponent } from "../add-location-dialog/add-location-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-map-wrapper",
  templateUrl: "./map-wrapper.component.html",
  styleUrls: ["./map-wrapper.component.css"],
})
export class MapWrapperComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(AddLocationDialogComponent, {
      width: "500px",
    });
  }
}
