import {Component} from '@angular/core';
import {AppService} from "../../app/app.service";
import {SignalRService} from "../../app/services/signalr.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {BotCardComponent} from "../../app/bot-card/bot-card.component";
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {KeyService} from "../../shared/key.service";
import {ListboxModule} from "primeng/listbox";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DiscordButtonComponent} from "./discord-button/discord-button.component";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    BotCardComponent,
    ButtonModule,
    NgForOf,
    NgIf,
    PanelModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    ProgressSpinnerModule,
    DiscordButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  sessionId: string = ''
  LOCAL_STORAGE_KEY = "microbot-id"
  playercount = 0;
  version = ''
  loading = false;

  constructor(private appService: AppService, public signalRService: SignalRService, private activatedRoute: ActivatedRoute,
              private router: Router, private userService: UserService, private keysService: KeyService) {

    this.version = environment.version;
    this.appService.getPlayercount().subscribe((result) => {
      this.playercount = result
    })

  }

  get keys$() {
    return this.keysService.keys$
  }

  get user$() {
    return this.userService.user$
  }

  get token() {
    return this.userService.token
  }

  ngOnInit(): void {
    this.loading = true
    // Subscribe to query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      this.userService.token = localStorage.getItem(this.LOCAL_STORAGE_KEY) as string
      if (code) {
        this.appService.fetchAccessToken(code)
          .pipe(finalize(() => this.loading = false))
          .subscribe((result) => {
            this.userService.token = result
            localStorage.setItem(this.LOCAL_STORAGE_KEY, result)
            this.router.navigate(['/'])
          })
      } else {
        if (this.userService.token) {
          this.keysService.getKeys()
          this.userService.fetchUserInfo()
        }
        this.loading = false
      }
    });
  }

  async openConnection() {
    const user = await this.userService.getUser();
    this.signalRService.openSignalRConnection(this.token, user?.id);
  }
}
