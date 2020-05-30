import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WishlistModel } from "src/app/models/wishlist.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  wishlistData: WishlistModel;
  updateWishlist = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  addWishlist(location: string, startDate: Date, endDate: Date, who: string) {
    let wishlistData;
    wishlistData = {
      location: location,
      startDate: startDate,
      endDate: endDate,
      who: who,
      creator: null,
    };
    return this.http.post<{ message: string; wishlist: WishlistModel }>(
      "http://localhost:3000/api/wishlist",
      wishlistData
    );
  }

  getWishlist() {
    return this.http
      .get<{ message: string; wishlist: any }>(
        "http://localhost:3000/api/wishlist"
      )
      .pipe(
        map((wishlistData) => {
          return {
            wishlist: wishlistData.wishlist.map((wish) => {
              return {
                location: wish.location,
                startDate: wish.startDate,
                endDate: wish.endDate,
                who: wish.who,
                visited: wish.visited,
                id: wish._id,
                creator: wish.creator,
              };
            }),
          };
        })
      );
  }

  updateWish(
    id: string,
    location?: string,
    startDate?: string,
    endDate?: string,
    who?: string
  ) {
    let wishlistData: WishlistModel;
    wishlistData = {
      id: id,
      location: location,
      startDate: startDate,
      endDate: endDate,
      who: who,
      visited: false,
      creator: null,
    };
    return this.http.put(
      "http://localhost:3000/api/wishlist/" + id,
      wishlistData
    );
  }

  updateVisited(id: string, visited: boolean) {
    return this.http.patch("http://localhost:3000/api/wishlist/" + id, {
      visited: visited,
    });
  }
  deleteWishlist(wishId: string) {
    return this.http.delete("http://localhost:3000/api/wishlist/" + wishId);
  }
}
