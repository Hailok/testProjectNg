import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {WindowSizeCheckerService} from '../services/window-size-checker.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('menuToggle', [
      state('visibly', style({
        transform: 'translate(0)'
      })),
      state('hidden', style({
        transform: 'translate(-100%)'
      })),
      transition('hidden <=> visibly', animate('0.3s ease-in-out'))
    ]),
    trigger('menuBackgroundToggle', [
      state('visibly', style({
        width: '100%',
        height: '100%',
        opacity: '0.32'
      })),
      state('hidden', style({
        width: '0',
        height: '0',
        opacity: '0'
      })),
      transition('hidden => visibly', animate('0.3s ease-in-out', keyframes([
        style({
          width: '100%',
          height: '100%',
          opacity: '0',
          offset: 0
        }),
        style({
          width: '100%',
          height: '100%',
          opacity: '0.32',
          offset: 1
        })
      ])))
    ])
  ]
})
export class NavigationComponent implements OnInit {
  menuItems: {linkName, linkTo}[] = [
    {linkName: 'About me', linkTo: '#about-me'},
    {linkName: 'Relationships', linkTo: '#relationships'},
    {linkName: 'Requirements', linkTo: '#requirements'},
    {linkName: 'Users', linkTo: '#users'},
    {linkName: 'Sign Up', linkTo: '#sign-up'}
  ]
  menuCurrentState: string;
  windowCurrentWidth: number;

  constructor(private windowSizeCheckerService: WindowSizeCheckerService) { }

  ngOnInit() {
    this.windowSizeCheckerService.DOMLoadedChecker().subscribe((bodyWidth) => {
      this.menuCurrentState = (bodyWidth > this.windowSizeCheckerService.tabletPoint) ? 'visibly' : 'hidden';
      this.windowCurrentWidth = bodyWidth;
    });
    this.windowSizeCheckerService.windowWidthChecker().subscribe((windowWidth) => {
      this.menuCurrentState = (windowWidth > this.windowSizeCheckerService.tabletPoint) ? 'visibly' : 'hidden';
      this.windowCurrentWidth = windowWidth;
    });
  }
  changeMenuState(fromMenu: boolean = false) {
    if (fromMenu) {
      if (this.windowCurrentWidth <= this.windowSizeCheckerService.tabletPoint) {
        this.menuCurrentState = 'hidden';
        return;
      } else { return; }
    }

    this.menuCurrentState = this.menuCurrentState === 'hidden' ? 'visibly' : 'hidden';
  }
}
