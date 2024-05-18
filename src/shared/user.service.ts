import { Injectable } from '@angular/core';
import {DiscordUser} from "../app/models/DiscordUser";
import {BehaviorSubject, catchError, lastValueFrom, Observable, of, take} from "rxjs";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<DiscordUser | null> = new BehaviorSubject<DiscordUser | null>(null);
  public user$: Observable<DiscordUser | null> = this.userSubject.asObservable();
  public token: string = '';


  constructor(private http: HttpClient) {
  }

  fetchUserInfo() {
    this.http.get<DiscordUser>(environment.api + '/auth/userinfo').pipe(take(1)).subscribe(
      (user) => this.userSubject.next(user)
    );
  }
  getUser() {
    return this.userSubject.getValue();
  }

  resetUser() {
    this.token = ''
    this.userSubject.next(null)
  }

}
