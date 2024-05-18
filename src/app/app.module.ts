import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppService} from "./app.service";
import {PanelModule} from "primeng/panel";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {TooltipModule} from 'primeng/tooltip';
import {MenubarModule} from "primeng/menubar";
import {SignalRService} from "./services/signalr.service";
import {CardModule} from "primeng/card";
import {BotCardComponent} from "./bot-card/bot-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {NgxStripeModule} from "ngx-stripe";
import {AuthInterceptor} from "../interceptors/auth.interceptor";
import {ErrorInterceptorService} from "../interceptors/error.interceptor";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingService} from "../shared/loading.service";
import {LoadingInterceptor} from "../interceptors/loading.interceptor";

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
    MenubarModule,
    CardModule,
    BotCardComponent,
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
    NgxStripeModule.forRoot(),
    ProgressSpinnerModule
  ],
  providers: [importProvidersFrom(HttpClientModule), AppService, MessageService, SignalRService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    LoadingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
