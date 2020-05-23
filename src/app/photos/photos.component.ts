import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddPhotosComponent } from "./add-photos/add-photos.component";
import { PhotosService } from "../services/photos/photos.service";
import { finalize } from "rxjs/operators";
import { PhotosModel } from "../models/photos.model";

@Component({
  selector: "app-photos",
  templateUrl: "./photos.component.html",
  styleUrls: ["./photos.component.css"],
})
export class PhotosComponent implements OnInit {
  preloader: boolean = false;
  photos: PhotosModel[] = [];
  constructor(
    private dialog: MatDialog,
    private photosService: PhotosService
  ) {}

  ngOnInit(): void {
    this.getPhotos();
    this.checkIfPhotoListWasUpdated();
  }

  openDialog(): void {
    this.dialog.open(AddPhotosComponent, {
      width: "500px",
    });
  }

  getPhotos() {
    this.preloader = true;
    this.photosService
      .getPhotos()
      .pipe(finalize(() => (this.preloader = false)))
      .subscribe((response) => {
        console.log(response);
        this.photos = response.photos;
      });
  }

  checkIfPhotoListWasUpdated(): void {
    this.photosService.updatePhotoList.subscribe((response) => {
      if (response) {
        this.getPhotos();
      }
    });
  }
}
