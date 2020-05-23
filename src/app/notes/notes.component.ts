import { Component, OnInit } from "@angular/core";
import { AddNoteDialogComponent } from "./add-note-dialog/add-note-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { PostModel } from "../posts/post.model";
import { PostsService } from "../posts/posts.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit {
  posts: PostModel[] = [];
  preloader: boolean = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated: boolean = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.preloader = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: PostModel[]; postCount: number }) => {
        this.preloader = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.preloader = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.preloader = true;
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.snackBar.open(
          "You have successfully deleted this note!",
          "Dismiss",
          {
            duration: 4000,
            verticalPosition: "bottom",
            horizontalPosition: "right",
          }
        );
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
        this.preloader = false;
      }
    );
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  openDialog(note?: PostModel): void {
    this.dialog.open(AddNoteDialogComponent, {
      width: "600px",
      data: note,
    });
  }
}
