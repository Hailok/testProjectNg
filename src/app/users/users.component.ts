import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { WindowSizeCheckerService } from '../services/window-size-checker.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public usersService: UsersService,
              private windowSizeCheckerService: WindowSizeCheckerService) { }

  ngOnInit() {
    this.windowSizeCheckerService.DOMLoadedChecker().subscribe((bodyWidth) => {
      this.usersService.startPageLink.setUsersPerPage = (bodyWidth > this.windowSizeCheckerService.mobilePoint) ? 6 : 3;
      this.usersService.nextPage = this.usersService.startPageLink.getLink;
      this.updateUsers();
    });
  }

  updateUsers() {
    this.usersService.loadNextPage();
  }

}
