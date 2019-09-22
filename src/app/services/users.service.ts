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
  startPage = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${ this.usersPerPage }`
  nextPage = this.startPage;

  constructor(private http: HttpClient) { }

  postUser(formData, token) {
    return this.http.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      body: formData,
      headers: {
        Token: token, // get token with GET api/v1/token method
      }
    }).subscribe(res => {
      this.nextPage = this.startPage;
      this.loadNextPage();
      console.log(res);
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
          return a.registration_timestamp - b.registration_timestamp;
        });

        this.isLoading = false;

        if (!response.links.next_url) { this.isGotAllList = true; }
        this.nextPage = response.links.next_url;
      });
  }
}
