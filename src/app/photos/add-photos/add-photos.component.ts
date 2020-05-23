import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "src/app/posts/post-create/mime-type.validator";
import { PhotosService } from "src/app/services/photos/photos.service";
import { finalize } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-add-photos",
  templateUrl: "./add-photos.component.html",
  styleUrls: ["./add-photos.component.css"],
})
export class AddPhotosComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddPhotosComponent>,
    private photosService: PhotosService,
    private snackBar: MatSnackBar
  ) {}
  imagePreview: string;
  preloader: boolean = false;
  addPhotosForm: FormGroup = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required],
    }),
    description: new FormControl(null, {
      validators: [Validators.required],
    }),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
  });

  ngOnInit(): void {}

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addPhotosForm.patchValue({ image: file });
    this.image.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get title(): FormControl {
    return <FormControl>this.addPhotosForm.get("title");
  }

  get image(): FormControl {
    return <FormControl>this.addPhotosForm.get("image");
  }

  get description(): FormControl {
    return <FormControl>this.addPhotosForm.get("description");
  }

  onSave() {
    this.photosService
      .addPhoto(
        this.addPhotosForm.value.title,
        this.addPhotosForm.value.description,
        this.addPhotosForm.value.image
      )
      .pipe(finalize(() => (this.preloader = false)))
      .subscribe(() => {
        this.snackBar.open(
          "You have successfully added a new photo!",
          "Dismiss",
          {
            duration: 4000,
            verticalPosition: "bottom",
            horizontalPosition: "right",
          }
        );
        this.photosService.updatePhotoList.next(true);
        this.dialogRef.close(true);
      });
  }
}
