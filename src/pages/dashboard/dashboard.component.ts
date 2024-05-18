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
import {finalize, shareReplay} from "rxjs/operators";

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
  playercount = 0;


  constructor(private appService: AppService, public signalRService: SignalRService,
              private userService: UserService, private keysService: KeyService) {
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

  async openConnection() {
    const user = this.userService.getUser();
    this.signalRService.openSignalRConnection(this.token, user?.id);
  }
}
