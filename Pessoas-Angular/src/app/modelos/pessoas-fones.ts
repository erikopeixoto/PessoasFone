import { Pessoas  } from '../modelos/pessoas';
import { FoneTipo } from '../modelos/fone-tipo';

export class PessoasFones{
  id: number;
  foneTipoId: number;
  pessoasId: number;
  foneNumero: number;
  pessoas: Pessoas;
  foneTipo: FoneTipo;
}
