import { Pessoas  } from '../modelos/pessoas';
import { FoneTipo } from '../modelos/fone-tipo';

export interface PessoasFonesDto{
  id: number;
  foneTipoId: string;
  descricao: string;
  pessoasId: number;
  nome: string;
  foneNumero: number;
  foneFormatado: string;
  pessoas: Pessoas;
  foneTipo: FoneTipo;
}
