import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { AddLocationDialogComponent } from "./add-location-dialog/add-location-dialog.component";
import { DataTransferService } from "../services/map-service.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  geocoder = new google.maps.Geocoder();
  lat = 45.9432;
  lng = 24.9668;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  constructor(
    private dialog: MatDialog,
    private dataTransfer: DataTransferService
  ) {}

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 2,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5",
          },
        ],
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f5f5",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#dadada",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#c9c9c9",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
    ],
  };
  options = {
    types: ["(cities)"],
    componentRestrictions: { country: "us" },
  };

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    new google.maps.Marker({
      map: this.map,
      position: this.coordinates,
    }).setMap(this.map);
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  // getCountry(country) {
  //   this.geocoder.geocode({ address: country }, function (results, status) {
  //     console.log(results);
  //     if (status === "OK") {
  //       new google.maps.Marker({
  //         map: this.map,
  //         position: results[0].geometry.location,
  //       });
  //     } else {
  //       alert("Geocode was not successful for the following reason: " + status);
  //     }
  //   });
  // }

  // addLocation() {
  //   this.getCountry("Romania");
  // }
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

  onClick() {
    this.getCountry("Berlin, Germany");
  }
  openDialog(): void {
    this.dataTransfer.sendAnything(this.map);
    this.dialog.open(AddLocationDialogComponent, {
      width: "500px",
    });
  }
}
