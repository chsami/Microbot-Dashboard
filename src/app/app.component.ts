import {Component} from '@angular/core';
import {AppService} from "./app.service";
import {ClipboardService} from "./clipboard.service";
import {MenuItem, MessageService} from "primeng/api";
import {SignalRService} from "./services/signalr.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';
  token = ''
  menuitems: MenuItem[]
  loading = false;
  hasRuneliteInstance = false
  LOCAL_STORAGE_KEY = "microbot-token"
  generatedToken = false
  playercount = 0;
  version = ''
  constructor(private appService: AppService, private clipboardService: ClipboardService, private messageService: MessageService, public signalRService: SignalRService) {
    this.menuitems = [{
      label: 'Home',
      icon: 'pi pi-home',
    }, {
      label: 'About',
      icon: 'pi pi-info-circle',
    }]

    this.version = environment.version;
    this.appService.getPlayercount().subscribe((result) => {
      this.playercount = result
    })

    //this.checkExistingToken()
  }

  async onGenerateToken() {
    alert('Coming soon!')
    /*this.loading = true;
    this.appService
      .getToken()
      .pipe(finalize(() => this.loading = false))
      .subscribe(token => {
        this.token = token;
        localStorage.setItem('microbot-token', token)
        this.signalRService.openSignalRConnection(this.token)
        this.generatedToken = true
      })*/

  }


  async onCopyToken(content: string) {
    this.clipboardService.copy(content)
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfull copy!'})
  }

  checkExistingToken() {
    this.token = localStorage.getItem(this.LOCAL_STORAGE_KEY) as string
    if (this.token) {
      this.appService.tokenExists(this.token).subscribe((result: boolean) => {
          if (!result) {
            this.resetToken();
          } else {
            this.signalRService.openSignalRConnection(this.token);
          }
        }
      )
    }
  }

  resetToken() {
    this.token = "";
    localStorage.removeItem(this.LOCAL_STORAGE_KEY)
  }
}
