import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {

    @Input() title: any;
    @Input() width: any;
    @Input() height: any;

    visible = false;

    constructor() {

    }

    closeModal(): void {
      this.visible = false;

      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }

    showModal(): void {
        this.visible = true;
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }

    getVisible(): boolean {
        return this.visible;
    }

}
