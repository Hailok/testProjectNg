import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLoading = false;
  isGotAllList = false;

  users = [];
  usersPerPage = 6;
  nextPage = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${ this.usersPerPage }`;

  constructor(private http: HttpClient) { }

  getUserById(id: number) {
    return this.http.get('https://frontend-test-assignment-api.abz.agency/api/v1/users/' + id)
      .pipe(
        map((response: {user}) => {
          console.log(response.user);
          return response.user;
        })
      );
  }

  loadNextPage() {
    this.isLoading = true;

    this.http.get(this.nextPage)
      .subscribe((response: {links: {next_url: string, prev_url: string}, users: []}) => {
        this.users = (this.users.concat(response.users)).sort((a, b) => {
          return a.registration_timestamp - b.registration_timestamp;
        });

        this.isLoading = false;

        if (!response.links.next_url) { this.isGotAllList = true; }
        this.nextPage = response.links.next_url;
      });
  }
}
