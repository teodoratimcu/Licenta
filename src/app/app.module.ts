import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatChipsModule } from "@angular/material/chips";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { AppWrapperComponent } from "./app-wrapper/app-wrapper.component";
import { HomeComponent } from "./home/home.component";
import { NotesComponent } from "./notes/notes.component";
import { AddNoteDialogComponent } from "./notes/add-note-dialog/add-note-dialog.component";
import { MapComponent } from "./map/map.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { PhotosComponent } from "./photos/photos.component";
import { AddLocationDialogComponent } from "./map/add-location-dialog/add-location-dialog.component";
import { MapWrapperComponent } from "./map/map-wrapper/map-wrapper.component";
import { AddPhotosComponent } from "./photos/add-photos/add-photos.component";
import { ChallengeComponent } from "./challenge/challenge.component";
import { AddChallengeComponent } from "./challenge/add-challenge/add-challenge.component";
import { QuitChallengeDialogComponent } from './challenge/quit-challenge-dialog/quit-challenge-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    AppWrapperComponent,
    HomeComponent,
    NotesComponent,
    AddNoteDialogComponent,
    MapComponent,
    PhotosComponent,
    AddLocationDialogComponent,
    MapWrapperComponent,
    AddPhotosComponent,
    ChallengeComponent,
    AddChallengeComponent,
    QuitChallengeDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    GoogleMapsModule,
    MatGridListModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressBarModule,
    MatChipsModule,
    DragDropModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
