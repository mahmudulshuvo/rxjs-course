import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { createHttpObservable } from "./common/util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app";

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");

    const courses$ = http$.pipe(map((res) => Object.values(res["payload"])));

    courses$.subscribe(
      (courses) => {
        console.log("My courses ", courses);
      },
      () => console.log("completed")
    );
  }
}
