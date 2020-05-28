import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ChallengeModel } from "src/app/models/challenge.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChallengeService {
  updateChallengeList = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  addChallenge(countries: number) {
    let challengeData;
    challengeData = {
      countries: countries,
      creator: null,
    };
    return this.http.post<{ message: string; challenge: ChallengeModel }>(
      "http://localhost:3000/api/challenge",
      challengeData
    );
  }

  getChallenges() {
    return this.http
      .get<{ message: string; challenges: any }>(
        "http://localhost:3000/api/challenge"
      )
      .pipe(
        map((challengeData) => {
          return {
            challenges: challengeData.challenges.map((challenge) => {
              return {
                countries: challenge.countries,
                id: challenge._id,
                creator: challenge.creator,
              };
            }),
          };
        })
      );
  }

  updateChallenge(id: string, countries: number) {
    let challengeData: ChallengeModel;
    challengeData = {
      id: id,
      countries: countries,
      creator: null,
    };
    return this.http.put(
      "http://localhost:3000/api/challenge/" + id,
      challengeData
    );
  }

  deleteChallenge(challengeId: string) {
    return this.http.delete(
      "http://localhost:3000/api/challenge/" + challengeId
    );
  }
}
