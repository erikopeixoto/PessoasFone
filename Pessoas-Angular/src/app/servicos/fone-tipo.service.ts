import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { GenericHttpService } from './generic.service';
import { FoneTipo } from '../modelos/fone-tipo';

@Injectable({
  providedIn: 'root'
})
export class FoneTipoService extends BaseService{

  constructor(
    private readonly servicoHttpGenerico: GenericHttpService<FoneTipo>
  ) {
    super();
  }

  public listar(): Promise<Array<FoneTipo>> {
    return this.servicoHttpGenerico.get(null, `${BaseService.getBaseAPI()}FoneTipo/listar`);
  }
}
