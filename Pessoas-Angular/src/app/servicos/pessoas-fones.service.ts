import { Injectable } from '@angular/core';
import { PessoasFones } from '../modelos/pessoas-fones';
import { BaseService } from './base.service';
import { GenericHttpService } from './generic.service';
import { PessoasFonesDto } from '../dtos/pessoas-fones-dto';

@Injectable({
  providedIn: 'root'
})
export class PessoasFonesService extends BaseService{
  public pessoasFoneDto: PessoasFonesDto = null;

  constructor(
    private readonly servicoHttpGenerico: GenericHttpService<PessoasFones>
  ) {
    super();
  }

  public listar(): Promise<Array<PessoasFonesDto>> {
    return this.servicoHttpGenerico.get(null, `${BaseService.getBaseAPI()}PessoasFones/listar`);
  }

  public incluir(pessoa: PessoasFones): Promise<Array<PessoasFonesDto>> {
    return this.servicoHttpGenerico.post(pessoa, `${BaseService.getBaseAPI()}PessoasFones/incluir`);
  }

  public excluir(pessoa: PessoasFones): Promise<Array<PessoasFonesDto>> {
    return this.servicoHttpGenerico.post(pessoa, `${BaseService.getBaseAPI()}PessoasFones/excluir`);
  }
}
