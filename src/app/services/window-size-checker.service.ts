import {HostListener, Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeCheckerService {
  // media-query points
  desktopPoint = 1200;
  tabletPoint = 960;
  mobilePoint = 710;

  DOMLoadedChecker() {
    return fromEvent(document, 'DOMContentLoaded')
      .pipe(
        map((event) => {
          return event.target.body.clientWidth;
        })
      );
  }

  windowWidthChecker() {
    return fromEvent(window, 'resize')
      .pipe(
        map((event) => {
          return event.currentTarget.innerWidth;
        })
      );
  }
}




















