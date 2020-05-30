import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WishlistService } from "src/app/services/wishlist/wishlist.service";
import { finalize } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-add-wish",
  templateUrl: "./add-wish.component.html",
  styleUrls: ["./add-wish.component.css"],
})
export class AddWishComponent implements OnInit {
  preloader: boolean = false;
  addWishlistForm: FormGroup = new FormGroup({
    location: new FormControl(null, {
      validators: [Validators.required],
    }),
    startDate: new FormControl(null, { validators: [Validators.required] }),
    endDate: new FormControl(null, { validators: [Validators.required] }),
    who: new FormControl(null, { validators: [Validators.required] }),
  });

  constructor(
    private dialogRef: MatDialogRef<AddWishComponent>,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.populateWishlistForm();
    }
  }

  onSave() {
    this.preloader = true;

    if (this.data) {
      this.wishlistService
        .updateWish(
          this.data.id,
          this.location.value,
          this.startDate.value,
          this.endDate.value,
          this.who.value
        )
        .pipe(finalize(() => (this.preloader = false)))
        .subscribe(() => {
          this.snackBar.open(
            "You have successfully updated this wish!",
            "Dismiss",
            {
              duration: 4000,
              verticalPosition: "bottom",
              horizontalPosition: "right",
            }
          );
          this.dialogRef.close(true);
          this.wishlistService.updateWishlist.next(true);
        });
    } else {
      this.wishlistService
        .addWishlist(
          this.location.value,
          this.startDate.value,
          this.endDate.value,
          this.who.value
        )
        .pipe(finalize(() => (this.preloader = false)))
        .subscribe(() => {
          this.snackBar.open(
            "You have successfully added a new wish!",
            "Dismiss",
            {
              duration: 4000,
              verticalPosition: "bottom",
              horizontalPosition: "right",
            }
          );
          this.dialogRef.close(true);
          this.wishlistService.updateWishlist.next(true);
        });
    }
  }

  populateWishlistForm() {
    if (this.data) {
      this.addWishlistForm.patchValue({
        location: this.data.location,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        who: this.data.who,
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }

  get location(): FormControl {
    return <FormControl>this.addWishlistForm.get("location");
  }

  get startDate(): FormControl {
    return <FormControl>this.addWishlistForm.get("startDate");
  }

  get endDate(): FormControl {
    return <FormControl>this.addWishlistForm.get("endDate");
  }

  get who(): FormControl {
    return <FormControl>this.addWishlistForm.get("who");
  }
}
