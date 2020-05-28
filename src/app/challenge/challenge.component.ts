import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddChallengeComponent } from "./add-challenge/add-challenge.component";
import { ChallengeService } from "../services/challenge/challenge.service";
import { finalize } from "rxjs/internal/operators/finalize";
import { ChallengeModel } from "../models/challenge.model";
import { QuitChallengeDialogComponent } from "./quit-challenge-dialog/quit-challenge-dialog.component";

@Component({
  selector: "app-challenge",
  templateUrl: "./challenge.component.html",
  styleUrls: ["./challenge.component.css"],
})
export class ChallengeComponent implements OnInit {
  preloader: boolean = false;
  challenges: ChallengeModel[] = [];
  constructor(
    private dialog: MatDialog,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.checkIfChallengeListWasUpdated();
    this.getChallenges();
  }

  getChallenges() {
    this.preloader = true;
    this.challengeService
      .getChallenges()
      .pipe(finalize(() => (this.preloader = false)))
      .subscribe((response) => {
        console.log(response.challenges);
        this.challenges = response.challenges;
      });
  }

  openDialog(challenge?: ChallengeModel) {
    this.dialog.open(AddChallengeComponent, {
      width: "600px",
      data: challenge,
    });
  }

  openDeleteDialog(challenge?: ChallengeModel) {
    this.dialog.open(QuitChallengeDialogComponent, {
      width: "600px",
      data: challenge,
    });
  }

  checkIfChallengeListWasUpdated(): void {
    this.challengeService.updateChallengeList.subscribe((response) => {
      if (response) {
        this.getChallenges();
      }
    });
  }
}
