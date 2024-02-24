import {Injectable} from "@angular/core";
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {environment} from "../../environments/environment";

@Injectable()
export class SignalRService {
  wsConnection: HubConnection;

  constructor() {
    this.wsConnection = new HubConnectionBuilder()
      .withUrl(environment.api + "/microbot")
      .withAutomaticReconnect([5000, 10000, 30000])
      .build();

    this.on("ReceiveMessage", data => {
      console.log(data);
    });
  }

  openSignalRConnection() {
    this.wsConnection.start()
      .then(() => this.invoke("SendMessage", "User1", "Hello"));
  }

  on(methodName: string, newMethod: (...args: any[]) => any) {
    this.wsConnection.on(methodName, newMethod);
  }

  invoke(methodName: string, ...args: any[]) {
    return this.wsConnection.invoke(methodName, args)
  }
}
