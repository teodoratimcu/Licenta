import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WishlistService } from "src/app/services/wishlist/wishlist.service";
import { finalize } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-delete-wish",
  templateUrl: "./delete-wish.component.html",
  styleUrls: ["./delete-wish.component.css"],
})
export class DeleteWishComponent implements OnInit {
  preloader: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<DeleteWishComponent>,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.preloader = true;

    this.wishlistService
      .deleteWishlist(this.data.id)
      .pipe(finalize(() => (this.preloader = false)))
      .subscribe(() => {
        this.snackBar.open(
          "You have successfully deleted this wish!",
          "Dismiss",
          {
            duration: 4000,
            verticalPosition: "bottom",
            horizontalPosition: "right",
          }
        );
        this.wishlistService.updateWishlist.next(true);
        this.dialogRef.close(true);
      });
  }
}
