import { Pessoas  } from '../modelos/pessoas';
import { FoneTipo } from '../modelos/fone-tipo';

export interface PessoasFonesDto{
  Id: number;
  FoneTipoId: string;
  Descricao: string;
  PessoasId: number;
  Nome: string;
  FoneNumero: number;
  FoneFormatado: string;
  Pessoas: Pessoas;
  FoneTipo: FoneTipo;
}
