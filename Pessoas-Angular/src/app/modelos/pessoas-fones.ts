import { Pessoas  } from '../modelos/pessoas';
import { FoneTipo } from '../modelos/fone-tipo';

export class PessoasFones{
  id: number;
  foneTipoId: string;
  pessoasId: number;
  foneNumero: number;
  pessoas: Pessoas;
  foneTipo: FoneTipo;
}
