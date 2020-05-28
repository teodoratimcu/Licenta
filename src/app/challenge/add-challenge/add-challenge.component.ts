import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ChallengeService } from "src/app/services/challenge/challenge.service";
import { finalize } from "rxjs/internal/operators/finalize";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-add-challenge",
  templateUrl: "./add-challenge.component.html",
  styleUrls: ["./add-challenge.component.css"],
})
export class AddChallengeComponent implements OnInit {
  preloader: boolean = false;
  addChallengeForm: FormGroup = new FormGroup({
    countries: new FormControl(null, [Validators.required]),
  });
  constructor(
    private dialogRef: MatDialogRef<AddChallengeComponent>,
    private challengeService: ChallengeService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.populateEditForm();
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  populateEditForm() {
    this.addChallengeForm.patchValue({
      countries: this.data.countries,
    });
  }

  onSave() {
    this.preloader = true;

    if (this.data) {
      this.challengeService
        .updateChallenge(this.data.id, this.addChallengeForm.value.countries)
        .pipe(finalize(() => (this.preloader = false)))
        .subscribe(() => {
          this.snackBar.open(
            "You have successfully added a new challenge!",
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
    } else {
      this.challengeService
        .addChallenge(this.addChallengeForm.value.countries)
        .pipe(finalize(() => (this.preloader = false)))
        .subscribe(() => {
          this.snackBar.open(
            "You have successfully added a new challenge!",
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

  get countries(): FormControl {
    return <FormControl>this.addChallengeForm.get("countries");
  }
}
