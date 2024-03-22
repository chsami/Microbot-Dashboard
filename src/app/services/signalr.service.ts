import {Injectable} from "@angular/core";
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {IBotPlugin} from "../bot-card/bot.plugin.interface";

@Injectable()
export class SignalRService {
  wsConnection: HubConnection | null;
  botPlugins: Observable<IBotPlugin[]> = of([]);
  constructor() {
    this.wsConnection = null;
  }

  openSignalRConnection(token: string) {
    this.wsConnection = new HubConnectionBuilder()
      .withUrl(environment.baseUrl + "/microbot?token=" + token)
      .withAutomaticReconnect([5000, 10000, 30000])
      .build();

    this.on("ReceiveMessage", data => {
      console.log(data);
    });
    this.on("ReceiveBotPlugins", data => {
      console.log(data)
      this.botPlugins = of(data)
    });
    this.wsConnection.start()
      .then(() => this.invoke("SendMessage", "User1", "Hello"))
      .then(() =>  this.invoke("AddToGroup", token))
  }

  on(methodName: string, newMethod: (...args: any[]) => any) {
    this.wsConnection?.on(methodName, newMethod);
  }

  invoke(methodName: string, ...args: any[]) {
    return this.wsConnection?.invoke(methodName, ...args)
  }
}
