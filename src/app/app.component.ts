import { Component } from '@angular/core';
import {DialogService} from "./shared/services/dialog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bank-client';
  constructor(public _dialogService: DialogService) {
  }
}
