import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLoading = false;
  isGotAllList = false;

  users = [];
  startPageLink = {
    startPage: `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=`,
    usersPerPage: 6,

    get getLink() {
      return this.startPage + this.usersPerPage;
    },

    set setUsersPerPage(value) {
      this.usersPerPage = value;
    }
  };

  nextPage = this.startPageLink.getLink;

  constructor(private http: HttpClient) { }

  postUser(formData, token) {
    this.http.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {
      headers: new HttpHeaders({
        Token: token,
      })
    }).subscribe((response) => {
      this.nextPage = this.startPageLink.getLink;
      this.users = [];
      this.loadNextPage();
    }, (response) => {
      const fails = response.error.fails;
      alert(JSON.stringify(fails));
    });
  }

  getToken() {
    return this.http.get('https://frontend-test-assignment-api.abz.agency/api/v1/token').pipe(
      map((response: {token}) => {
        return response.token;
      })
    );
  }

  getPositions() {
    return this.http.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .pipe(
        map((response: {positions: []}) => {
          return response.positions;
        })
      );
  }

  getUserById(id: number) {
    return this.http.get('https://frontend-test-assignment-api.abz.agency/api/v1/users/' + id)
      .pipe(
        map((response: {user}) => {
          return response.user;
        })
      );
  }

  loadNextPage() {
    this.isLoading = true;
    this.http.get(this.nextPage)
      .subscribe((response: {links: {next_url: string, prev_url: string}, users: []}) => {
        this.users = (this.users.concat(response.users)).sort((a, b) => {
          return -( a.registration_timestamp - b.registration_timestamp );
        });

        this.isLoading = false;

        if (!response.links.next_url) { this.isGotAllList = true; }
        this.nextPage = response.links.next_url;
      });
  }
}
