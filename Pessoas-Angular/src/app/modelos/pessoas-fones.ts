import { Pessoas  } from '../modelos/pessoas';
import { FoneTipo } from '../modelos/fone-tipo';

export class PessoasFones{
  id: number;
  foneTipoId: string;
  pessoasId: Date;
  foneNumero: number;
  pessoas: Pessoas;
  foneTipo: FoneTipo;
}
