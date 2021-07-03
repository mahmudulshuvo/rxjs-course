import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");

    const courses$ = http$.pipe(
      catchError((err) => {
        console.log("Error Occured: ", err);
        return throwError(err);
      }),
      finalize(() => {
        console.log("Finalize block executed");
      }),
      tap((res) => console.log("Request executed ", res)),
      map((res) => res["payload"] as Course[]),
      shareReplay()
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );
  }
}
