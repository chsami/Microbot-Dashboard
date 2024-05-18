import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {MessageService} from "primeng/api";
import {environment} from "../environments/environment";
import {DiscordUser} from "./models/DiscordUser";
@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  getPlayercount() {
    return this.http.get<number>(environment.api + '/session/count')
  }

  fetchAccessToken(code: string) {
    return this.http.get(environment.api + "/auth/discord/user?code=" + code, { responseType: 'text'})
  }
}
