import { Observable } from "rxjs";
import { Course } from "../model/course";

export function createHttpObservable(url: string) {
  return new Observable<any>((observer) => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(url, { signal })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          observer.error("Request failed with status code: " + res.status);
        }
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });

    return () => abortController.abort();
  });
}
