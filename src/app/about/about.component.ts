import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { concat, fromEvent, interval, of } from "rxjs";
import { concatMap, take } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);

    const result$ = concat(source1$, source2$);
    result$.subscribe(console.log);
    // const clicks = fromEvent(document, "click");
    // const result = clicks.pipe(concatMap((ev) => interval(1000).pipe(take(4))));
    // result.subscribe((x) => console.log(x));
  }
}
