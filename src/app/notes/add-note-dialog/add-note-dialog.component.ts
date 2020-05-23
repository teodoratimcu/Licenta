import { Component, OnInit, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { PostModel } from "src/app/posts/post.model";
import { PostsService } from "src/app/posts/posts.service";
import { AuthService } from "src/app/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ParamMap, ActivatedRoute } from "@angular/router";
import { mimeType } from "src/app/posts/post-create/mime-type.validator";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-add-note-dialog",
  templateUrl: "./add-note-dialog.component.html",
  styleUrls: ["./add-note-dialog.component.css"],
})
export class AddNoteDialogComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: PostModel;
  postsPerPage = 5;
  currentPage = 1;
  preloader = false;
  addEditNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    content: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType],
    }),
  });
  imagePreview: string;
  private mode = "create";
  private postId: string;
  private authStatusSub: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddNoteDialogComponent>,
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.populateEditForm();
    }
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.preloader = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.preloader = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.preloader = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator,
          };
          this.addEditNoteForm.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addEditNoteForm.patchValue({ image: file });
    this.addEditNoteForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    this.preloader = true;

    if (!this.data) {
      this.postsService
        .addPost(
          this.addEditNoteForm.value.title,
          this.addEditNoteForm.value.content,
          this.addEditNoteForm.value.image
        )
        .pipe(finalize(() => (this.preloader = false)))
        .subscribe(() => {
          this.snackBar.open(
            "You have successfully added a new post!",
            "Dismiss",
            {
              duration: 4000,
              verticalPosition: "bottom",
              horizontalPosition: "right",
            }
          );
          this.postsService.getPosts(this.postsPerPage, this.currentPage);
          this.dialogRef.close(true);
        });
    } else {
      this.postsService.updatePost(
        this.data.id,
        this.addEditNoteForm.value.title,
        this.addEditNoteForm.value.content,
        this.addEditNoteForm.value.image
      );
    }
    this.dialogRef.close(true);
  }

  populateEditForm() {
    if (this.data) {
      this.addEditNoteForm.patchValue({
        title: this.data.title,
        content: this.data.content,
        image: this.data.image,
      });
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get title(): FormControl {
    return <FormControl>this.addEditNoteForm.get("title");
  }

  get content(): FormControl {
    return <FormControl>this.addEditNoteForm.get("content");
  }
  get image(): FormControl {
    return <FormControl>this.addEditNoteForm.get("image");
  }
}
