import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ChallengeService } from "src/app/services/challenge/challenge.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-quit-challenge-dialog",
  templateUrl: "./quit-challenge-dialog.component.html",
  styleUrls: ["./quit-challenge-dialog.component.css"],
})
export class QuitChallengeDialogComponent implements OnInit {
  preloader: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<QuitChallengeDialogComponent>,
    private challengeService: ChallengeService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.preloader = true;

    this.challengeService
      .deleteChallenge(this.data.id)
      .pipe(finalize(() => (this.preloader = false)))
      .subscribe(() => {
        this.snackBar.open(
          "You have successfully deleted this challenge!",
          "Dismiss",
          {
            duration: 4000,
            verticalPosition: "bottom",
            horizontalPosition: "right",
          }
        );
        this.challengeService.updateChallengeList.next(true);
        this.dialogRef.close(true);
      });
  }
}
