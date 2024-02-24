import {Component} from '@angular/core';
import {AppService} from "./app.service";
import {DOCUMENT} from '@angular/common';
import {ClipboardService} from "./clipboard.service";
import {MenuItem, MessageService} from "primeng/api";
import {SignalRService} from "./services/signalr.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';
  token = ''
  existingTokenMessage = ''
  private tempTextArea: HTMLTextAreaElement | undefined;
  menuitems: MenuItem[]
  loading = false;

  constructor(private appService: AppService, private clipboardService: ClipboardService, private messageService: MessageService, private signalRService: SignalRService) {
    this.menuitems = [{
      label: 'Home',
      icon: 'pi pi-home',
    }, {
      label: 'About',
      icon: 'pi pi-info-circle',
    }]

    this.checkExistingToken()
  }

  async onGenerateToken() {
    this.loading = true;
    this.appService.getToken().pipe(finalize(() => this.loading = false)).subscribe(token => {
      this.token = token;
      localStorage.setItem('microbot-token', token)

      this.signalRService.openSignalRConnection()
    })

  }



  async onCopyToken(content: string) {
    this.clipboardService.copy(content)
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfull copy!'})
  }

  checkExistingToken() {
    this.token = localStorage.getItem('microbot-token') as string
    if (this.token) {
      this.existingTokenMessage = 'Looks like you already have a token generated!'
      this.signalRService.openSignalRConnection();
    }
  }
}
