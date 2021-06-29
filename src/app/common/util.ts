import { Observable } from "rxjs";
import { Course } from "../model/course";

export function createHttpObservable(url: string) {
  return new Observable<Course[]>((observer) => {
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}
