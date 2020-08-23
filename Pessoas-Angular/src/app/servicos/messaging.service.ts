import { BaseService } from './base.service';
import { Injectable, EventEmitter } from '@angular/core';
import { ModalMessage } from '../modelos/modal-message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  message = new EventEmitter<ModalMessage>();
}
