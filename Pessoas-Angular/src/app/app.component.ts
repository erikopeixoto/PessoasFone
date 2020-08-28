import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { AlertaComponent } from './shared/components/alerta/alerta.component';
import { Alerta } from './shared/modelos/alerta';
import { ModalMessage } from './modelos/modal-message';
import { MessagingService } from './servicos/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pessoas-Angular';
  private readonly messages = new Array<ModalMessage>();
  private showingMessage: boolean;

  constructor(
    public readonly messagingService: MessagingService,
    public dialog: MatDialog,
    ) {
    this.messagingService.message.subscribe(message => {
      this.handleMessage(message);
  });
 }

 handleMessage(message: ModalMessage): void {
  if (this.messages.length > 0) {
    this.messages.forEach(msg => {
      if (msg.message !== message.message ){
        this.messages.push(message);
      }
    });
  } else {
    this.messages.push(message);
  }

  if (this.messages.length > 0) {
    this.showNextMessage();
  }
 }

 showNextMessage(): void {
  const Message = !this.showingMessage ? this.messages[0] : null;
  if (!this.showingMessage) {
    this.showingMessage = true;
    const { title, message, type } = Message;
    let cor = 'warn';
    switch (type)
    {
      case 'danger':
        cor = 'worn';
        break;
      case 'warning':
        cor = 'yellow';
        break;
      case 'info':
        cor = 'blue';
        break;
    }

    const config = {
      data: {
        titulo: title,
        descricao: message,
        btnSucesso: 'Ok',
        corBtnSucesso: cor,
        possuirBtnFechar: false
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.mostraMensagens();
      } else {
        this.mostraMensagens();
      }
    });
  }
 }

 mostraMensagens(): void {
  this.showingMessage = false;
  this.messages.shift();
  if (this.messages.length > 0) {
    this.showNextMessage();
  }
 }
}
