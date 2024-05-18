import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-discord-button',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './discord-button.component.html',
  styleUrl: './discord-button.component.css'
})
export class DiscordButtonComponent {

  url: string;

  constructor() {
    this.url = "https://discord.com/oauth2/authorize?client_id=1236706015534121000&response_type=code&redirect_uri=" + window.location.origin + "&scope=identify+connections+openid+guilds+email+guilds.join+gdm.join"
  }

}
