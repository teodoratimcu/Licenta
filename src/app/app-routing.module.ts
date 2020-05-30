import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { NotesComponent } from "./notes/notes.component";
import { MapComponent } from "./map/map.component";
import { PhotosComponent } from "./photos/photos.component";
import { ChallengeComponent } from "./challenge/challenge.component";
import { WishlistComponent } from "./wishlist/wishlist.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "notes",
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "map",
    component: MapComponent,
  },
  {
    path: "photos",
    component: PhotosComponent,
  },
  {
    path: "challenge",
    component: ChallengeComponent,
  },
  {
    path: "wishlist",
    component: WishlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
