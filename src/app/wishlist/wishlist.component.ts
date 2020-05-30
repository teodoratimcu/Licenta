import { Component, OnInit } from "@angular/core";
import { AddWishComponent } from "./add-wish/add-wish.component";
import { MatDialog } from "@angular/material/dialog";
import { WishlistModel } from "../models/wishlist.model";
import { WishlistService } from "../services/wishlist/wishlist.service";
import { finalize } from "rxjs/operators";
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from "@angular/material/slide-toggle";
import { DeleteWishComponent } from "./delete-wish/delete-wish.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent implements OnInit {
  enableHeart: boolean = false;
  preloader: boolean = false;
  wishlist: WishlistModel[] = [];
  dataSource;

  displayedColumns: string[] = [
    "favorite",
    "location",
    "startDate",
    "endDate",
    "who",
    "visited",
    "edit",
    "delete",
    "actions",
  ];
  constructor(
    private dialog: MatDialog,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkIfWishlistWasUpdated();
    this.getWishlist();
    console.log(this.dataSource);
  }

  onChange({ checked }: MatSlideToggleChange, id: string) {
    this.wishlistService
      .updateVisited(id, checked)
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
        this.wishlistService.updateWishlist.next(true);
      });
    console.log(this.wishlist);
  }

  getWishlist(): void {
    this.preloader = true;

    this.wishlistService
      .getWishlist()
      .pipe(finalize(() => (this.preloader = false)))
      .subscribe((response) => {
        this.wishlist = response.wishlist;
        this.dataSource = new MatTableDataSource(this.wishlist);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  checkIfWishlistWasUpdated(): void {
    this.wishlistService.updateWishlist.subscribe((response) => {
      if (response) {
        this.getWishlist();
      }
    });
  }

  openDialog(wish?: WishlistModel): void {
    this.dialog.open(AddWishComponent, {
      width: "500px",
      data: wish,
    });
  }

  openDeleteDialog(wish?: WishlistModel): void {
    this.dialog.open(DeleteWishComponent, {
      width: "500px",
      data: wish,
    });
  }
}
