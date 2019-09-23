import { Component, OnInit } from '@angular/core';
import { WindowSizeCheckerService } from './services/window-size-checker.service';
import { EasingMethodsService } from './services/easing-methods.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'abzAgency';
  bannerTexts = {
    long: 'We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck!',
    short: 'We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository.'
  };
  currentBannerText = this.bannerTexts.short;

  constructor(private windowSizeCheckerService: WindowSizeCheckerService,
              public easingMethodsService: EasingMethodsService) {}

  ngOnInit() {
    this.windowSizeCheckerService.DOMLoadedChecker().subscribe((bodyWidth) => {
      this.currentBannerText = (bodyWidth > this.windowSizeCheckerService.mobilePoint) ? this.bannerTexts.long : this.bannerTexts.short;
    });
    this.windowSizeCheckerService.windowWidthChecker().subscribe((windowWidth) => {
      this.currentBannerText = (windowWidth > this.windowSizeCheckerService.mobilePoint) ? this.bannerTexts.long : this.bannerTexts.short;
    });
  }
}
