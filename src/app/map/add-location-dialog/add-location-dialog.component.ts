import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
} from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataTransferService } from "src/app/services/map-service.service";

@Component({
  selector: "app-add-location-dialog",
  templateUrl: "./add-location-dialog.component.html",
  styleUrls: ["./add-location-dialog.component.css"],
})
export class AddLocationDialogComponent implements OnInit {
  @ViewChild("cities", { static: false }) public city: ElementRef;
  disableCities: boolean = false;
  geocoder = new google.maps.Geocoder();
  addLocationForm: FormGroup = new FormGroup({
    countries: new FormControl("", [Validators.required]),
    cities: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  });
  place;
  autocomplete;
  coutries = [];
  cities = [];
  list = document.getElementById("countries");
  map: google.maps.Map;
  componentRestriction;
  constructor(
    private dialogRef: MatDialogRef<AddLocationDialogComponent>,
    private dataTransfer: DataTransferService
  ) {}

  ngOnInit(): void {
    this.dataTransfer.products.subscribe((res) => (this.map = res));
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  autocompleteFocus() {
    console.log("test");
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("cities") as HTMLInputElement,
      {
        types: ["(cities)"],
        componentRestrictions: { country: this.componentRestriction },
      }
    );
    google.maps.event.addListener(
      this.autocomplete,
      "place_changed",
      function () {
        this.place = this.getPlace().name;
        console.log(this.place);
      }
    );
  }
  autocompleteFocuss() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("countries") as HTMLInputElement,
      {
        types: ["establishment"],
        componentRestrictions: { country: this.componentRestriction },
      }
    );
    google.maps.event.addListener(
      this.autocomplete,
      "place_changed",
      function () {
        this.place = this.getPlace().name;
      }
    );
  }
  onSelectChange(event) {
    this.autocompleteFocus();
    this.disableCities = true;
    this.componentRestriction = event.value;
  }

  getCountry(country) {
    this.geocoder.geocode({ address: country }, function (results, status) {
      console.log(results);
      //this.map.setCenter(results[0].geometry.location);
      if (status === "OK") {
        new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  onSave() {
    console.log("test");
    console.log(this.place);
    this.getCountry("Berlin, Germany");
    this.dialogRef.close();
  }
}
