import {Component, ElementRef, HostListener} from '@angular/core';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
})
export class ActionsComponent {

  constructor(private elementRef: ElementRef) {
  }

  public isMenuOpen: boolean = false

  public onClose() {
    this.isMenuOpen = false;
  }
  public onToggleMenu(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public onEdit(event: Event) {

  }
  public onDelete(event: Event) {

  }


}
