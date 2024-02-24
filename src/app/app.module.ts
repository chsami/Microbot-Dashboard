import {importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import {AppService} from "./app.service";
import {PanelModule} from "primeng/panel";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import { TooltipModule } from 'primeng/tooltip';
import {MenubarModule} from "primeng/menubar";
import {SignalRService} from "./services/signalr.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    PanelModule,
    ToggleButtonModule,
    ToastModule,
    MessageModule,
    TooltipModule,
    MenubarModule
  ],
  providers: [importProvidersFrom(HttpClientModule), AppService, MessageService, SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
