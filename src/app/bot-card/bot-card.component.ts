import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import {TreeSelectModule} from "primeng/treeselect";

@Component({
  selector: 'app-bot-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    TreeSelectModule
  ],
  templateUrl: './bot-card.component.html',
  styleUrl: './bot-card.component.css'
})
export class BotCardComponent {
  stateOptions: any[] = [{label: 'Off', value: false}, {label: 'On', value: true}];
  value: string = 'off';

  @Input() botPlugin = {name: '', active: false}

  constructor() {
  }
}
