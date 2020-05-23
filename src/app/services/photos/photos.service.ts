import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PhotosModel } from "src/app/models/photos.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: "root",
})
export class PhotosService {
  updatePhotoList = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  addPhoto(title: string, description: string, image: File) {
    const photoData = new FormData();
    photoData.append("title", title);
    photoData.append("description", description);
    photoData.append("image", image, title);
    return this.http.post<{ message: string; post: PhotosModel }>(
      "http://localhost:3000/api/photos",
      photoData
    );
  }

  getPhotos() {
    return this.http
      .get<{ message: string; photos: any }>("http://localhost:3000/api/photos")
      .pipe(
        map((photoData) => {
          return {
            photos: photoData.photos.map((photo) => {
              return {
                title: photo.title,
                description: photo.description,
                id: photo._id,
                imagePath: photo.imagePath,
                creator: photo.creator,
              };
            }),
          };
        })
      );
  }
}
