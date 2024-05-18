import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, take} from "rxjs";
import {DiscordUser} from "../app/models/DiscordUser";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private keysSubject: BehaviorSubject<ScriptKey[]> = new BehaviorSubject<ScriptKey[]>([]);
  public keys$: Observable<ScriptKey[]> = this.keysSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getKeys() {
    return this.http.get<ScriptKey[]>(environment.api + '/scriptKeys')
      .pipe(take(1))
      .subscribe((keys) => {
        this.keysSubject.next(keys)
        console.log(keys)
    })
  }

}

export interface ScriptKey {
  id: string
  key: string
  hwid: string
  active: boolean
}
