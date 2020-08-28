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
  public cargaDados: boolean;

  constructor(
    private readonly servicoHttpGenerico: GenericHttpService<PessoasFones, PessoasFonesDto>
  ) {
    super();
  }

  public listar(): Promise<Array<any>> {
    return this.servicoHttpGenerico.get(null, `${BaseService.getBaseAPI()}PessoasFones/listar`);
  }

  public incluir(pessoa: PessoasFones): Promise<Array<PessoasFonesDto>> {
    return this.servicoHttpGenerico.post(pessoa, `${BaseService.getBaseAPI()}PessoasFones/incluir`);
  }

  public excluir(id: number): Promise<Array<PessoasFonesDto>> {
    return this.servicoHttpGenerico.delete(`${BaseService.getBaseAPI()}PessoasFones/excluir/${id}`);
  }

  public alterar(pessoa: PessoasFones): Promise<Array<PessoasFonesDto>> {
    return this.servicoHttpGenerico.put(pessoa, `${BaseService.getBaseAPI()}PessoasFones/alterar`);
  }

}
